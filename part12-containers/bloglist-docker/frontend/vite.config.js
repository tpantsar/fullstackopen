import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: { usePolling: true },
    allowedHosts: ['frontend', 'backend', 'localhost'],
  },
  proxy: {
    '/api': {
      target: 'http://localhost:3001/', // API requests are routed to the backend server
      changeOrigin: true,
      secure: false, // Avoid HTTPS issues in local development
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './testSetup.js',
  },
})
