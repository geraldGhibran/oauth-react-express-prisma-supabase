import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"

// const env = loadEnv(mode, process.cwd(), '');
// https://vite.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env': env
    },
    plugins: [react(), tsconfigPaths()],
    server: {
      watch: {
        usePolling: true,
      },
    },
  }
})
// export default defineConfig({
//   define: {
//     'process.env': env
//   },
//   plugins: [react(), tsconfigPaths()],
//   server: {
//     watch: {
//       usePolling: true,
//     },
//   },
// })
