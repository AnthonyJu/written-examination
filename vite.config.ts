import path from 'node:path'
import process from 'node:process'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig, loadEnv } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import Layouts from 'vite-plugin-vue-layouts'
import SupportSetupName from 'vite-plugin-vue-support-setup-name'
import SvgLoader from 'vite-svg-loader'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: env.VITE_BASE_URL,
    port: 3010,
    open: true,
    server: {
      hmr: true,
      host: true,
    },

    build: {
      outDir: 'dist',
      assetsInlineLimit: 1025 * 5, // 小于5kb的文件转换为base64
      chunkSizeWarningLimit: 1500, // 大于1500kb进行打包警告
      rollupOptions: {
        output: {
          // 打包文件归类
          chunkFileNames: 'assets/js/[name].[hash].js',
          entryFileNames: 'assets/js/[name].[hash].js',
          assetFileNames: 'assets/[ext]/[name].[hash].[ext]',
          // 手动分包，大文件单独打包，减少首屏加载时间
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('element-plus')) {
                return 'element-plus'
              }
              else {
                return 'vendor'
              }
            }
          },
        },
      },
    },

    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/element/index.scss" as *;',
        },
      },
    },

    optimizeDeps: {
      include: [
        '@element-plus/icons-vue',
        '@vueuse/core',
        'axios',
        'element-plus/es',
        'element-plus/es/components/base/style/index',
        'element-plus/es/components/message/style/index',
        'element-plus/es/components/message-box/style/index',
        'element-plus/es/components/notification/style/index',
        'unplugin-vue-router/runtime',
        'unplugin-vue-router/data-loaders/basic',
      ],
    },

    plugins: [
      // https://github.com/posva/unplugin-vue-router
      VueRouter({
        extensions: ['.vue'],
        routeBlockLang: 'yaml',
        dts: 'src/typed-router.d.ts',
        exclude: ['**/components/**/*'],
      }),

      // https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#readme
      Vue({ include: [/\.vue$/] }),

      // https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue-jsx
      VueJsx(),

      // https://github.com/AnthonyJu/npm-packages/tree/main/packages/vite-plugin-vue-setup-name-support
      SupportSetupName(),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          'pinia',
          '@vueuse/core',
          VueRouterAutoImports,
          {
            // add any other imports you were relying on
            'vue-router/auto': ['useLink'],
          },
        ],
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
        dts: 'src/auto-imports.d.ts',
        dirs: [
          'src/hooks/**/*',
          'src/events',
          'src/stores',
          'src/utils',
        ],
        vueTemplate: true,
      }),

      // https://github.com/antfu/unplugin-vue-components
      Components({
        dts: 'src/components.d.ts',
        include: [/\.vue$/, /\.vue\?vue/],
        exclude: ['src/components/**/components/**/*'],
        // 生产环境下按需引入element-plus
        resolvers: command === 'build' ? ElementPlusResolver({ importStyle: 'sass' }) : undefined,
      }),

      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts(),

      // 开发环境完整引入element-plus
      command === 'serve'
        ? {
            name: 'vite:element-plus-auto-import-in-dev',
            transform(code, id) {
              if (/src\/main.ts$/.test(id)) {
                return {
                  code: `
                    import ElementPlus from 'element-plus'
                    import 'element-plus/theme-chalk/src/index.scss'
                    ${code.split('const app = createApp(App)').join('const app = createApp(App);app.use(ElementPlus);')};
                  `,
                  map: null,
                }
              }
            },
          }
      // https://github.com/element-plus/unplugin-element-plus/tree/main/#readme
        : ElementPlus({ useSource: true }),

      // https://github.com/jpkleemans/vite-svg-loader?tab=readme-ov-file#vite-svg-loader
      SvgLoader({
        defaultImport: 'url',
      }),

      // https://github.com/antfu/unocss
      // see uno.config.ts for config
      Unocss(),

      // https://devtools-next.vuejs.org/guide/vite-plugin
      VueDevTools(),
    ],
  }
})
