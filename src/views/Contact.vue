<template>
    
  <v-app id="contact">
    <v-app-bar
      app
      color="grey darken-4"
      flat
    >
   

      <v-tabs
        centered
        color="white"
        dark
      >
        <v-tab router to="/" >
          Home
        </v-tab>

        <v-tab router to="/about" >
            About
        </v-tab>

        <v-tab router to="/contact" >
            Contact Us
        </v-tab>


      </v-tabs>

      <!-- login and register button below -->



    </v-app-bar>


    <v-main class="pt-5 grey lighten-1">
        

        <!--  -->
        
        <h1>Contact</h1>
       

    </v-main>

  </v-app>
</template>

<script>

    

  export default {
    name: 'Contact',
    data: () => ({

      
    }),

  }
</script>
