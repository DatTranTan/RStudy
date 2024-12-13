import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Lắng nghe tất cả các IP
    port: 5173,      // Đảm bảo port bạn muốn dùng
  }
})
