import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'node:url';
import postcssPxtorem from 'postcss-pxtorem';
import AutoImport from 'unplugin-auto-import/vite';
import ElementPlus from 'unplugin-element-plus/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
    }),
    ElementPlus({
      useSource: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/scss/base.scss" as *;`,
      },
    },
    postcss: {
      plugins: [
        postcssPxtorem({
          rootValue: 100, // 根据设计稿宽度计算，如设计稿宽度为750px，则rootValue设为100
          unitPrecision: 5, // 保留rem小数点后5位
          propList: ['*'], // 需要转换的属性，这里选择所有属性
          selectorBlackList: ['.ignore', '.hairlines'], // 过滤掉ignore-开头的class
          replace: true,
          mediaQuery: false, // 是否在媒体查询的css中也转换
          minPixelValue: 1, // 小于或等于1px不转换为rem
        }),
      ],
    },
  },
});
