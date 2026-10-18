import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base relativa para que funcione en cualquier dominio/subcarpeta de Netlify.
// assetsInlineLimit: 0 mantiene las imágenes como archivos (mejor caché y velocidad).
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0
  }
})
