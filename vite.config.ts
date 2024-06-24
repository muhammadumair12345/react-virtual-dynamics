import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    dts({
      tsconfigPath: 'tsconfig.app.json',
      outDir: 'dist',
      include: ['src/components/**/*.ts', 'src/components/**/*.tsx'],
    }),
  ],
  build: {
    lib: {
      entry: 'src/components/index.ts', // Entry point of your library
      name: 'ReactVirtualDynamics', // Global name for UMD build
      formats: ['es', 'cjs'], // Output formats
      fileName: (format) => `react-virtual-dynamics.${format}.js`, // Output file naming pattern
    },
    rollupOptions: {
      external: ['react', 'react-dom'], // Mark these dependencies as external to avoid bundling them
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
