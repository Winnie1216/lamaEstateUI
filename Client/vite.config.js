// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],

// },
// )
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      plugins: [
        {
          name: 'html',
          transform(code, id) {
            if (id.endsWith('.html')) {
              return {
                code: `export default ${JSON.stringify(code)}`,
                map: { mappings: '' },
              };
            }
          },
        },
      ],
    },
  },
});
