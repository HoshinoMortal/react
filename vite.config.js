import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

function jsToJsxPlugin() {
  return {
    name: 'js-to-jsx',
    transform(code, id) {
      if (id.endsWith('.js') && code.includes('<')) {
        return {
          code: code,
          loader: 'jsx'
        }
      }
    }
  }
}

export default defineConfig({
  plugins: [
    jsToJsxPlugin(),
    react({
      include: '**/*.{js,jsx,ts,tsx}',
    }),
  ],
  define: {
    global: 'globalThis',
  },
  root: '.',
  publicDir: 'app/resource',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'antd-vendor': ['antd'],
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
        },
      },
    },
  },
  esbuild: {
    loader: 'jsx',
    include: [/\.js$/, /\.jsx$/, /\.tsx$/, /\.ts$/],
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  resolve: {
    alias: {
      '@apis': path.resolve(__dirname, './app/apis'),
      '@configs': path.resolve(__dirname, './app/configs'),
      '@ajax': path.resolve(__dirname, './app/configs/ajax.js'),
      '@config': path.resolve(__dirname, './app/configs/config.js'),
      '@reg': path.resolve(__dirname, './app/configs/regular.config.js'),
      '@components': path.resolve(__dirname, './app/components'),
      '@tableList': path.resolve(__dirname, './app/components/tableList/tableList.js'),
      '@redux/actions': path.resolve(__dirname, './app/redux/actions'),
      '@actions': path.resolve(__dirname, './app/redux/actions'),
      '@images': path.resolve(__dirname, './app/images'),
      '@styles': path.resolve(__dirname, './app/styles'),
      '@pages': path.resolve(__dirname, './app/pages'),
      '@reducers': path.resolve(__dirname, './app/redux/reducers'),
      '@middleware': path.resolve(__dirname, './app/middleware'),
      '@utils': path.resolve(__dirname, './app/utils'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#1890ff',
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:1111',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
