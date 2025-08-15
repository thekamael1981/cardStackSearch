import express, { Request, Response, NextFunction } from "express";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { registerRoutes } from "./routes";
import { serveStatic, log } from "./vite";

const app = express();

// Middleware body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const path = req.path;
  let capturedJson: any;

  const originalJson = res.json;
  res.json = function (body, ...args) {
    capturedJson = body;
    return originalJson.apply(this, [body, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJson) {
        logLine += ` :: ${JSON.stringify(capturedJson)}`;
      }
      if (logLine.length > 80) logLine = logLine.slice(0, 79) + "…";
      log(logLine);
    }
  });

  next();
});

// Routes
app.get("/api/hello", (_req: Request, res: Response) => {
  res.json({ message: "Hello from Vercel Serverless!" });
});

// Register custom routes
registerRoutes(app);

// Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

// Serve static files (production only)
serveStatic(app);

// Export handler untuk Vercel
export default (req: VercelRequest, res: VercelResponse) => {
  return app(req as any, res as any);
};
