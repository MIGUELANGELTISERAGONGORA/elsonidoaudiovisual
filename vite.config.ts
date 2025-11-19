import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  return {
    plugins: [react()],
    root: './', 
    base: '/',
    build: {
      outDir: 'dist',
    },
    server: {
      port: 3000,
    },
    define: {
      // Polyfill process.env to prevent "process is not defined" errors
      'process.env': {},
      // Map the API key specifically
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});