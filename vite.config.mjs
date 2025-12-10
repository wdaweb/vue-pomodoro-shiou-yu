// Plugins
import { fileURLToPath, URL } from 'node:url'
import Vue from '@vitejs/plugin-vue'
import Fonts from 'unplugin-fonts/vite'

import { defineConfig } from 'vite'
// Utilities
import checker from 'vite-plugin-checker'
import { VitePWA } from 'vite-plugin-pwa'
import { VitePluginRadar } from 'vite-plugin-radar'
import vueDevTools from 'vite-plugin-vue-devtools'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    Vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    vueDevTools(),
    Fonts({
      google: {
        families: [{
          name: 'Roboto',
          styles: 'wght@100;300;400;500;700;900',
        }],
      },
    }),
    checker(),
    VitePWA({
      // 設定自動更新快取
      registerType: 'autoupdate',
      // 使用 workbox 套件產生網站檔案快取的 service worker
      // 調整 workbox 的設定
      workbox: {
        // 清除過期的快取
        cleanupOutdatedCaches: true,
        // 要快取哪些檔案
        // 設定成所有資料夾的所有檔案
        globPatterns: ['**/*'],
        // 是否要忽略網址參數，這兩個路徑網址參數不同，會被當成是不同檔案
        // a.jpg?fbclid=123
        // a.jpg?fbclid=456
        // 修改設定成忽略所有網址參數，當成相同檔案
        ignoreURLParametersMatching: [/.*/],
      },
      // Android 的 PWA 設定
      // 自動產生 site.webmanifest 檔
      manifest: {
        name: 'Pomodoro',
        short_name: 'Pomodoro',
        icons: [
          {
            src: './web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        theme_color: '#bf7956',
        background_color: '#bf7956',
        display: 'standalone',
        start_url: './',
        scope: './',
      },
    }),
    VitePluginRadar({
      analytics: {
        id: 'G-2GP6W6D5GS',
      },
    }),
  ],
  optimizeDeps: {
    exclude: [
      'vuetify',
      'vue-router',
      'unplugin-vue-router/runtime',
      'unplugin-vue-router/data-loaders',
      'unplugin-vue-router/data-loaders/basic',
    ],
  },
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
  },
})
