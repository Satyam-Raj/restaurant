<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  metaInfo: {
    title: 'Crispicy',
    titleTemplate: '%s | Inventory & Sales',
    htmlAttrs: {
      lang: 'en-US'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'description', content: 'Crispicy !! Are you a merchant or restaurant owner? This is a management system that will help merchant to keep track of sales, inventory, and other business information.' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'referrer', content: 'origin-when-crossorigin', id: 'meta_referrer'},
      { rel: 'canonical', href:'https://crispicy.com/'},
      { property:'og:title', content:'Crispicy'},
      { property:'og:description', content:'Crispicy !! Are you a merchant or restaurant owner? This is a management system that will help merchant to keep track of sales, inventory, and other business information.'},
      { property: 'og:locale', content: 'en_US'},
      { property: 'og:url', content: 'https://crispicy.com/'},
      { property: 'og:site_name', content: 'Crispicy'},
      { property: 'og:type', content: 'website'},
      { property: 'og:image', content: 'https://crispicy.com/images/logo.png'},
      { property: 'og:image:width', content: '1200'},
      { property: 'og:image:height', content: '630'},
      { name: 'twitter:card', content: 'summary_large_image'},
      { name: 'twitter:site', content: '@crispicy'},
      { name: 'twitter:title', content: 'Crispicy'},
      { name: 'twitter:description', content: 'Crispicy !! Are you a merchant or restaurant owner? This is a management system that will help merchant to keep track of sales, inventory, and other business information.'},
      { name: 'twitter:image', content: 'https://crispicy.com/images/logo.png'},
      { name: 'twitter:image:alt', content: 'Crispicy'},
      { name: 'twitter:image:width', content: '1200'},
      { name: 'twitter:image:height', content: '630'},
      { name: 'apple-mobile-web-app-capable', content: 'yes'},
      { name: 'apple-mobile-web-app-status-bar-style'},
    ]
  },
  data: () => ({
    //
  }),
};
</script>


