// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  hooks: {
    ready: (ctx) => console.log("context"),
  },

  devtools: { enabled: true },
});
