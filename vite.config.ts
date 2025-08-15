import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',      // folder output build default
    emptyOutDir: true,   // hapus isi folder sebelum build
  },
})
