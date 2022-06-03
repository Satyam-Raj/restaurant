<template>
    
  <v-app id="contact">
    <v-app-bar
      app
      color="grey darken-4"
      flat
    >

    <v-toolbar-title class="white--text">
        <span class="headline"> <pre>Crispicy </pre></span>
      </v-toolbar-title>
   

      <v-tabs
        centered
        color="white"
        dark
      >
        <v-tab router to="/" >
          Home
        </v-tab>

        <v-tab router to="/services" >
            Services
        </v-tab>

        <v-tab router to="/contact" >
            Contact Us
        </v-tab>


      </v-tabs>

      <!-- login and register button below -->



    </v-app-bar>


    <v-main class="pa-15 ">

      <v-sheet
            
            class="mx-auto pa-5"
            height="auto"
            width="auto"
            elevation="10"
            dark
            align="center"
          >
            <h1 class="orange--text">Contact Us</h1>
            <body class="pa-10 blue--text">
              We would love to hear your feedback, suggestions, or questions. Contact us at below email address.
            </body>
            <h3>crispicy@crispicy.com</h3>
          </v-sheet>

    </v-main>

  </v-app>
</template>


