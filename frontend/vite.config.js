import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8128,
  },
  build: {
    outDir: "../dist", // Specify your desired output directory here
  },
});
