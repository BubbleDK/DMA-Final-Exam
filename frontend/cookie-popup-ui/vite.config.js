import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.jsx'),
      name: 'Cookie Popup UI',
      formats: ['umd'], // Specify UMD format
      fileName: (format) => `cookie-popup-ui.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM' // Include react-dom in globals
        },
        sourcemap: true // Enable source maps
      }
    }
  },
  plugins: [react()]
})