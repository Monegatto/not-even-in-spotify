import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/not-even-in-spotify/',
  https: true,
  plugins: [react()],
})
