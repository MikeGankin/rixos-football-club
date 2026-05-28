import {defineConfig} from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig(({command}) => {
  const isDev = command === "serve";

  return {
    server: {
      host: "127.0.0.1",
      open: "/__vite-plugin-monkey.install.user.js",
    },
    plugins: [
      isDev &&
      monkey({
        entry: 'src/main.js',
        userscript: {
          icon: 'https://vitejs.dev/logo.svg',
          namespace: 'npm/vite-plugin-monkey',
          match: ['https://www.coral.ru/monkey/'],
        },
        server: {
          open: true,
        },
      }),
    ].filter(Boolean),
  }
});
