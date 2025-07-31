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
      title: "啾啾 | Chirp",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
        { "http-equiv": "X-Content-Type-Options", content: "nosniff" },
        { name: "author", content: "啾啾開發小隊" },
        {
          name: "keywords",
          content: "啾啾,Chirp,社群網站,留言,按讚,追蹤,發文,社交平台",
        },
        {
          name: "description",
          content: "啾啾是一個輕量自由的社群平台，讓你用一則貼文啾出生活點滴。",
        },
        { property: "og:locale", content: "zh-TW" },
        { property: "og:type", content: "website" },
        {
          property: "og:url",
          content: "https://chirp-space-frontend.onrender.com",
        },
        {
          property: "og:title",
          content: "啾啾 | Chirp",
        },
        {
          property: "og:image",
          content: "https://example.com/image.png",
        },
        {
          property: "og:description",
          content: "在啾啾用你的聲音分享生活、連結好友，一起自由發聲。",
        },
      ],
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
