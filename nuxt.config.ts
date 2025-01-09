// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  ssr: false,

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ["@/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  components: ["@/components"],
  devServer: {
    host: '0.0.0.0',
  }
})
