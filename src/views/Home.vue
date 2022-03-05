<template>
    
  <v-app id="home">
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
        <v-tab
          v-for="link in links"
          :key="link"
        >
          {{ link }}
        </v-tab>


      </v-tabs>

      <!-- login and register button below -->



    </v-app-bar>


    

    <v-main class="pt-3 grey lighten-1">
        

        <!--  -->
        <v-container
            fluid
            :justify="center"
            
        >
            <v-row
                justify="center"
                align="center"
            >
            <v-col
                cols="12"
                sm="4"
            >
                    <v-sheet
                        rounded="xl"
                        min-height="368"
                        color="grey darken-2"
                        dark
                    >

                    <div align="center">


                        <h1 class="text-center">Login</h1>
                        <body class="mt-10">Login to your merchant account.</body>
                        
                        <v-btn 
                            color="amber lighten-1"
                            rounded
                            class="mt-10"
                        >

                        Login
                        </v-btn>
                    </div>    
                    </v-sheet>
                </v-col>
                

            <v-col
                cols="12"
                sm="4"
            >
                    <v-sheet
                        rounded="xl"
                        min-height="368"
                        color="grey darken-2"
                        dark
                    >
                    <div align="center">
                        <h1 class="text-center">Register</h1>

                        <body class="mt-10">Create your merchant account.</body>

                        <v-btn 
                            color="amber lighten-1 "
                            rounded
                            class="mt-10"
                        >
                        Register
                        </v-btn>

                    </div>
                        <!--  -->
                    </v-sheet>
            </v-col>
            </v-row>
        </v-container>

 

            
            <v-container>
                <v-row>
               

                <v-col
                    cols="12"
                    sm="12"
                >
                    <v-sheet
                    min-height="40vh"
                    rounded="lg"
                    >


                    <v-img
                        src="https://www.clipartkey.com/mpngs/m/15-151495_icons-checklist-computer-black-text-white-check-list.png"
                        max-width="20%"
                    ></v-img>
                        <h1>Hello</h1>


                    <!--  -->
                    </v-sheet>
                </v-col>

                
                </v-row>
            </v-container>



        <v-container>

            <div 
                class="pa-7 col-md-6 col-sm-12 mx-auto"          
            >

            <h1 class="text-center">Frequently Asked Questions</h1>
            
            
                <v-row class="pa-7" :justify="center" >
                    <v-expansion-panels inset  focusable>

                        <v-expansion-panel>
                            <v-expansion-panel-header color="grey darken-2" class="white--text font-weight-bold" >How this technology is useful for merchant?</v-expansion-panel-header>
                            <v-expansion-panel-content>
                            This technology is developed to assist the merchant in managing their business. This is a management system that will help the merchant to keep track of their sales, inventory, and other business related information. This system will also help the merchant to manage their business in a more efficient way. Keep all the record (sales, inventory, etc.) of your business in one place and manage it online with ease.
                            </v-expansion-panel-content>
                        </v-expansion-panel>

                        <v-expansion-panel>
                            <v-expansion-panel-header color="grey darken-2" class="white--text font-weight-bold" >Do we require to take subscription or is it free?</v-expansion-panel-header>
                            <v-expansion-panel-content>
                            This management system platform strictly requires subscription. This is because this system is developed by a team of developers and we have to pay for the technology which we are using to serve our customers like servers, domains, databases etc. However, we provide limited free trial period for our customers on special requests from their side, so that they can try out our system and see if it is suitable for them. 
                            </v-expansion-panel-content>
                        </v-expansion-panel>

                        <v-expansion-panel>
                            <v-expansion-panel-header color="grey darken-2" class="white--text font-weight-bold" >Who can take advantage of this type of management system?</v-expansion-panel-header>
                            <v-expansion-panel-content>
                            A merchant who wants to manage their sales, inventory, and other business related information online. If you want to keep transactional records, sales, inventory, etc. of your business in one place, then this is the technology that you need. We provide all sorts of features to make your business management easier, and many more features are coming soon.
                            </v-expansion-panel-content>
                        </v-expansion-panel>


                    </v-expansion-panels>
                </v-row>
            </div>
        </v-container>
       

    </v-main>

  </v-app>
</template>

<script>

    

  export default {
    name: 'Inventory',
    data: () => ({

      links: [
        'Home',
        'About',
        'Contact Us',
      ],
    }),

  }
</script>
