import { z } from "zod";

export const cardSequenceSchema = z.object({
  cards: z.array(z.number().positive()),
  target: z.number()
});

export const simulationStepSchema = z.object({
  stepNumber: z.number(),
  cards: z.array(z.number()),
  selectedCard: z.number().optional(),
  selectedIndex: z.number().optional(),
  action: z.enum(['initial', 'compare', 'remove_above', 'remove_below', 'found', 'not_found']),
  description: z.string(),
  comparisons: z.number()
});

export const simulationResultSchema = z.object({
  found: z.boolean(),
  target: z.number(),
  totalSteps: z.number(),
  totalComparisons: z.number(),
  searchPath: z.array(z.number()),
  efficiency: z.number()
});

export type CardSequence = z.infer<typeof cardSequenceSchema>;
export type SimulationStep = z.infer<typeof simulationStepSchema>;
export type SimulationResult = z.infer<typeof simulationResultSchema>;
