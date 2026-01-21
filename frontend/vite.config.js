import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';


export default defineConfig({
  plugins: [react(), tailwindcss(),],
   server: {
    host: '0.0.0.0'
  },
  resolve: {
    alias: {
      Components: "/src/Components",
      Pages: "/src/Pages",
      Assets: "/src/Assets",
      Config: "/src/Config",
      Layout: "/src/Layout",
      Redux: "/src/Redux",
      Routes: "/src/Routes",
      Utils: "/src/Utils",


    }
  }
});

