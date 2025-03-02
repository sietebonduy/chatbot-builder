import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import yaml from 'vite-plugin-yaml'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), yaml()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  }
})
