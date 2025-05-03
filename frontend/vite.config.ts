import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/sidekiq': {
        target: 'http://backend:80/sidekiq',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sidekiq/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            const authHeader = proxyReq.getHeader('Authorization')
            if (authHeader) {
              proxyReq.setHeader('Authorization', authHeader)
            }
          })
        }
      }
    }
  },
})
