// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  devServer: {
    port: 8000
  },
  modules: ['@ant-design-vue/nuxt'],
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
    },
  }
})