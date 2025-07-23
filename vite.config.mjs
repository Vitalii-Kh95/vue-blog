import { fileURLToPath, URL } from 'node:url';
import os from 'os';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import fs from 'fs';
import path from 'path';

function getLocalIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    for (const alias of iface) {
      if (alias.family === 'IPv4' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return 'localhost';
}

// https://vite.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  if (command === 'start') {
    return {
      server: {
        https: {
          key: fs.readFileSync(path.resolve(__dirname, 'certs/localhost-key.pem')),
          cert: fs.readFileSync(path.resolve(__dirname, 'certs/localhost.pem'))
        },
        host: 'localhost', // so you can open https://localhost:3000
        port: 3000
      },
      define: {
        __USE_HTTPS__: true,
        __HOST_IP__: JSON.stringify(getLocalIPAddress())
      },
      plugins: [vue()],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      }
    };
  } else {
    return {
      define: {
        __USE_HTTPS__: false,
        __HOST_IP__: JSON.stringify(getLocalIPAddress())
      },
      plugins: [vue()],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      }
    };
  }
});

// export default defineConfig({
//   server: {
//     https: {
//       key: fs.readFileSync(path.resolve(__dirname, 'certs/localhost-key.pem')),
//       cert: fs.readFileSync(path.resolve(__dirname, 'certs/localhost.pem'))
//     },
//     host: 'localhost', // so you can open https://localhost:3000
//     port: 3000
//   },
//   define: {
//     __HOST_IP__: JSON.stringify(getLocalIPAddress())
//   },
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   }
// });
