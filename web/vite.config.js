import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'public/build',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home:        resolve(__dirname, 'src/scss/pages/home.scss'),
        catalog:     resolve(__dirname, 'src/scss/pages/catalog.scss'),
        product:     resolve(__dirname, 'src/scss/pages/product.scss'),
        cart:        resolve(__dirname, 'src/scss/pages/cart.scss'),
        checkout:    resolve(__dirname, 'src/scss/pages/checkout.scss'),
        blog:        resolve(__dirname, 'src/scss/pages/blog.scss'),
        'blog-post': resolve(__dirname, 'src/scss/pages/blog-post.scss'),
        about:       resolve(__dirname, 'src/scss/pages/about.scss'),
        contacts:    resolve(__dirname, 'src/scss/pages/contacts.scss'),
        main:        resolve(__dirname, 'src/js/main.js'),
        'js-product': resolve(__dirname, 'src/js/pages/product.js'),
        'js-cart':    resolve(__dirname, 'src/js/pages/cart.js'),
      },
      output: {
        assetFileNames: 'css/[name].[hash].css',
        chunkFileNames: 'js/[name].[hash].js',
        entryFileNames: 'js/[name].[hash].js',
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/scss/base/variables" as *;\n`,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
