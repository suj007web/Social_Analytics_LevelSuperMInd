import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api/langflow/lf': {
        target: 'https://api.langflow.astra.datastax.com/lf',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/langflow\/lf/, ''),
        secure: false,
        headers: {
          'Origin': 'https://api.langflow.astra.datastax.com'
        }
      }
    },
  },
});