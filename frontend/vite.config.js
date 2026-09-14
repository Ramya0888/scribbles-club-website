import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
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
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) return 'react-vendor';
          if (id.includes('src/components/Cursor') || id.includes('src/components/Splash')) return 'cursor-splash';
        },
      },
    },
  },
});
