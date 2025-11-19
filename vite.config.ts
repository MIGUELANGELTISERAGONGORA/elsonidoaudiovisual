import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carga las variables de entorno. El tercer argumento '' carga todas las variables.
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  // Prioriza la variable de entorno, pero usa la clave proporcionada como respaldo seguro
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
      // Polyfill simple para evitar crash si alguna librería accede a process.env sin comprobar
      'process.env': {},
      // Inyección directa y segura de la API Key
      'process.env.API_KEY': JSON.stringify(apiKey),
      // Polyfill para 'global' que algunas librerías antiguas necesitan
      global: 'window',
    }
  };
});