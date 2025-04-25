import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
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
