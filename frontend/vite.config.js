import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/motion')) return 'motion';
          if (id.includes('node_modules/react-router')) return 'router';
          if (id.includes('node_modules/react-icons')) return 'icons';
          if (id.includes('node_modules/lucide-react')) return 'lucide';
        },
      },
    },
  },
});
