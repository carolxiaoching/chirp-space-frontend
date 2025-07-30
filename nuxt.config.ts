// https://nuxt.com/docs/api/configuration/nuxt-config
import IconsResolver from "unplugin-icons/resolver";
import ViteComponents from "unplugin-vue-components/vite";
// unplugin-icons 官方說明： https://github.com/unplugin/unplugin-icons

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "nuxt-headlessui",
    "unplugin-icons/nuxt",
  ],
  vite: {
    plugins: [
      ViteComponents({
        resolvers: [
          IconsResolver({
            // 需加 icon 前綴及 collection 前綴，例如 <icon-mdi-home />
            prefix: "icon",
            strict: true,
          }),
        ],
        // 是否自動產生 TypeScript 的定義檔 components.d.ts
        dts: false,
      }),
    ],
  },
  css: ["~/assets/css/tailwind.css"],
  runtimeConfig: {
    public: {
      apiUrl: "",
    },
  },
  app: {
    head: {
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&display=swap",
        },
      ],
    },
  },
});
