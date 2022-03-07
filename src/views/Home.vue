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


    

    <v-main class="pt-5 grey lighten-1">
        

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
                sm="6"
            >
                    <v-sheet
                        rounded="xl"
                        min-height="291"
                        color="grey darken-2"
                        dark
                    >

                    <div align="center">


                        <v-row
                            justify="center"
                            align="center"
                        >
                            <v-col
                                cols="10"
                                sm="6"
                                class="mt-5"

                            
                            >
                                <h1 class="text-center black--text">Login</h1>
                                <body class="mt-10">Login to your business account.  </body>
                                
                                <v-btn 
                                    color="black"
                                    rounded
                                    class="mt-10"
                                >

                                Login
                                </v-btn>
                            </v-col>

                            <v-col
                                cols="10"
                                sm="6"
                                class="mt-5"
                            
                            >
                                <h1 class="text-center black--text">Register</h1>
                                <body class="mt-10">Create your business account.  </body>
                                
                                <v-btn 
                                    color="black"
                                    rounded
                                    class="mt-10"
                                >

                                Register
                                </v-btn>
                            </v-col>
                        </v-row>


                        
                    </div>    
                    </v-sheet>
                </v-col>
                

            <!-- <v-col
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
                            color="black"
                            rounded
                            class="mt-10"
                        >
                        Register
                        </v-btn>

                    </div>
                    </v-sheet>
            </v-col> -->
            </v-row>
        </v-container>

 

            
            <v-container class="pa-5">
                <v-row>
               

                <v-col
                    cols="12"
                    sm="12"
                >
                    <v-sheet
                    min-height="32vh"
                    rounded="lg"
                    color="black"
                    class="pa-4"
                    dark
                    >
                    

                    <v-row
                        justify="center"
                        align="center"
                        class="pa-2"
                        >
                        <v-col>
                            <span>
                                <h1>Hello !! 😀</h1>
                                <h2>Welcome to Crispy.</h2>
                                <body>
                                    Are you a restaurant owner? Or, a merchant, tired of documenting your records of sales, inventory, etc. on physical paper and looking to digitalize your business. We provide every service you need to get your business online at very less price. And many exciting features to help you grow your business. Access your business record anywhere, anytime and from any device with Crispy.
                                </body>
                            </span>

                        </v-col>

                        <v-col>
                            <span>
                            <v-img
                                lazy-src="https://media.istockphoto.com/vectors/document-icon-on-black-background-black-flat-style-vector-vector-id1161114277?k=20&m=1161114277&s=170667a&w=0&h=R_1F1FHPftuEaJdOXh8nMoXaliii6WtVbO61kJQlOgM="
                                max-height="350"
                                max-width="auto"
                                class=" rounded float-right"
                                src="https://media.istockphoto.com/vectors/document-icon-on-black-background-black-flat-style-vector-vector-id1161114277?k=20&m=1161114277&s=170667a&w=0&h=R_1F1FHPftuEaJdOXh8nMoXaliii6WtVbO61kJQlOgM="
                                ></v-img>
                            </span>
                        </v-col>

                    </v-row>

                        


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
