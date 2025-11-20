import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  // Use env var or fallback key
  const apiKey = env.API_KEY || "AIzaSyBwmeKLypgsbuiLd6jTe0u3XtLy8muPQC4";

  return {
    plugins: [react()],
    root: './', 
    base: '/',
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: false
    },
    server: {
      port: 3000,
    },
    define: {
      // Safely inject the API Key. We do NOT override the entire process.env object
      // to avoid breaking libraries that rely on process.env.NODE_ENV.
      'process.env.API_KEY': JSON.stringify(apiKey),
      
      // Polyfill global for legacy compatibility
      global: 'window',
    }
  };
});