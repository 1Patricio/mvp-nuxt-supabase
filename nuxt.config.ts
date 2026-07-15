// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/supabase',
    '@nuxtjs/seo'
  ],
  css: ['~/assets/css/main.css'],
  supabase: {
    types: '~/types/database.types',
    redirectOptions: {
      login: '/auth/login',
      callback: '/auth/confirm',
      include: undefined,
      exclude: [
        '/',
        '/auth/register',
        '/post-details/*'
      ],
      saveRedirectToCookie: false,
    }
  },
  app:{
    head: {
      htmlAttrs: {
        lang: 'pt-BR'
      }
    }
  },
  site: {
    name: 'Dev Blog'
  },
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ]
    }
  },
})