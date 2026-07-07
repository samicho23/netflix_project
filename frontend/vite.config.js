import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  },
  optimizeDeps: {
    esbuildOptions: {
      // ይህ መስመር Vite የ .js ፋይሎችን እንደ .jsx አድርጎ እንዲያነባቸው ያዝዘዋል!
      loader: {
        '.js': 'jsx',
      },
    },
  },
});