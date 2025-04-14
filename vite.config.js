import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'robots.txt'],
      manifest: {
        name: 'Time Heist',
        short_name: 'Time Heist',
        description: 'Time Heist is an action-packed game where players race against time to complete thrilling missions and outsmart enemies.',
        theme_color: '#121a2b',
        background_color: '#121a2b',
        display: 'fullscreen',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/icon-48x48.png',
            sizes: '48x48',
            type: 'image/png',
          },
          {
            src: '/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: '/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: '/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: '/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: '/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
        ],
        screenshots: [
          {
            src: '/screenshot-1.png',
            sizes: '414x896',
            type: 'image/png',
          },
          {
            src: '/screenshot-2.png',
            sizes: '414x896',
            type: 'image/png',
          },
          {
            src: '/screenshot-3.png',
            sizes: '414x896',
            type: 'image/png',
          },
          {
            src: '/screenshot-4.png',
            sizes: '414x896',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: process.env.NODE_ENV === 'development',
        type: 'module',
        navigateFallback: 'index.html',
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@convex': resolve(__dirname, './convex'),
    },
  },
})
