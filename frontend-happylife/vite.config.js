import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Cấu hình loaders
  rules: [
    {
      test: /\.pdf$/,
      use: 'file-loader',
    },
  ],
})
