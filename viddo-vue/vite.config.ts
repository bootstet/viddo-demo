import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    hmr: {
      overlay: true  // 设置为 false 可以完全关闭错误提示
    }
  }
})
