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
    titleTemplate: '%s | Inventory & Sales management system',
    htmlAttrs: {
      lang: 'en-US'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'description', content: 'Are you a merchant or restaurant owner? This is a management system that will help merchant to keep track of sales, inventory, and other business information.' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },
  data: () => ({
    //
  }),
};
</script>


