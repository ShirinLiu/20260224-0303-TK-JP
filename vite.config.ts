
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
        manifest: {
          name: '2026 JP & KR Trip',
          short_name: 'JP & KR',
          description: 'Japan & Korea Travel Itinerary 2026',
          theme_color: '#f5f5f0',
          background_color: '#f5f5f0',
          display: 'standalone',
          orientation: 'portrait',
          icons: [
            {
              src: 'https://raw.githubusercontent.com/ShirinLiu/20260224-0303-Tokyo-Korea/main/20260224-0303-japan-%26-korea/assets/apple-touch-icon.jpg',
              sizes: '192x192',
              type: 'image/jpeg'
            },
            {
              src: 'https://raw.githubusercontent.com/ShirinLiu/20260224-0303-Tokyo-Korea/main/20260224-0303-japan-%26-korea/assets/apple-touch-icon.jpg',
              sizes: '512x512',
              type: 'image/jpeg'
            }
          ]
        },
        workbox: {
          // Keep the cache clean
          cleanupOutdatedCaches: true,
          
          // Cache Google Maps Script (API itself, not tiles)
          // Note: Maps tiles usually cannot be cached effectively for offline navigation
          
          runtimeCaching: [
            {
              // 1. CACHE GITHUB RAW IMAGES (Crucial for your photos)
              // This ensures all the itinerary photos work offline
              urlPattern: /^https:\/\/raw\.githubusercontent\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'trip-images-cache',
                expiration: {
                  maxEntries: 200,
                  maxAgeSeconds: 60 * 60 * 24 * 60 // Cache for 60 days
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              // 2. CACHE TAILWIND CDN
              // Needed because index.html uses the CDN script
              urlPattern: /^https:\/\/cdn\.tailwindcss\.com\/.*/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'tailwind-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                }
              }
            },
            {
              // 3. CACHE ESM.SH MODULES
              // Needed for the React dependencies in index.html importmap
              urlPattern: /^https:\/\/esm\.sh\/.*/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'esm-modules-cache',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 * 365
                }
              }
            }
          ]
        }
      })
    ],
    define: {
      // Polyfill process.env.API_KEY so standard GenAI SDK code works in browser
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});
