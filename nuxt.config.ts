// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  hooks: {
    ready: (ctx) => console.log("context"),
  },
  experimental: {
    componentIslands: true,
  },
  devtools: { enabled: true },
});
