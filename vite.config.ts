import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './', // Define la raíz del proyecto en el directorio actual
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  }
});