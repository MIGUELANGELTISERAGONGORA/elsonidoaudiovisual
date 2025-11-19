import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
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
      // Define process.env.API_KEY to allow the SDK to work in the browser
      // and pick up the key from Netlify environment variables
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});