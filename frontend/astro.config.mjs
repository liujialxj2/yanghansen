import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import apostrophe from '@apostrophecms/apostrophe-astro';
import path from 'path';
import astroI18next from 'astro-i18next';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

// https://astro.build/config
export default defineConfig({
  output: "server",
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 4321,
    host: true
  },
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [
    apostrophe({
      aposHost: 'http://localhost:3000',
      apiKey: process.env.APOS_EXTERNAL_FRONT_KEY,
      widgetsMapping: './src/widgets',
      templatesMapping: './src/templates',
      includeResponseHeaders: [
        'content-security-policy',
        'strict-transport-security',
        'x-frame-options',
        'referrer-policy',
        'cache-control'
      ],
      excludeRequestHeaders: [
        // For hosting on multiple servers, block the host header
        // 'host'
      ]
    }),
    // 添加多语言支持
    astroI18next({
      defaultLocale: 'zh',
      locales: ['zh', 'en'],
      i18nextServer: {
        debug: true
      },
      i18nextClient: {
        debug: true
      },
      routing: {
        prefixDefaultLocale: false
      }
    })
  ],
  vite: {
    server: {
      hmr: false, // 禁用HMR以避免WebSocket错误
      watch: {
        usePolling: true, // 使用轮询检测文件变化
        interval: 1000
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true
        }
      }
    },
    ssr: {
      // Do not externalize the @apostrophecms/apostrophe-astro plugin, we need
      // to be able to use virtual: URLs there
      noExternal: ['@apostrophecms/apostrophe-astro']
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      }
    }
  }
});