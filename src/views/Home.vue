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
                        :elevation="10"
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

                                <v-dialog
                                v-model="dialog"
                                persistent max-width="600px" 
                                min-width="360px"
                                @click:outside="dialog = false"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn 
                                            color="black"
                                            rounded
                                            class="mt-10"
                                            v-bind="attrs"
                                            v-on="on"
                                        >

                                        Login
                                        </v-btn>
                                    </template>

                                    <v-card>
                                        <v-tabs background-color="black" icons-and-text dark grow>

                                            <v-tabs-slider color="purple darken-4"></v-tabs-slider>
                                            <v-tab >
                                                <v-icon large>mdi-account</v-icon>
                                                <div class="caption py-1">Login</div>
                                            </v-tab>

                                            <v-tab-item>
                                                <v-card class="px-4">
                                                    <v-card-text>
                                                        <v-form ref="loginForm" v-model="valid" lazy-validation>
                                                            <v-row>
                                                                <v-col cols="12">
                                                                    <v-text-field v-model="loginEmail" :rules="loginEmailRules" label="E-mail" required></v-text-field>
                                                                </v-col>
                                                                <v-col cols="12">
                                                                    <v-text-field v-model="loginPassword" :append-icon="show1?'eye':'eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                                                                </v-col>
                                                                <v-col class="d-flex" cols="12" sm="6" xsm="12">
                                                                </v-col>
                                                                <v-spacer></v-spacer>
                                                                <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                                                                    <v-btn x-large block :disabled="!valid" color="indigo accent-3" class="white--text"  @click="validate"> Login </v-btn>
                                                                </v-col>
                                                            </v-row>
                                                        </v-form>
                                                    </v-card-text>
                                                </v-card>
                                            </v-tab-item>
                                            
                                        </v-tabs>
                                    </v-card>
                                    
                                </v-dialog>

                            </v-col>

                            

                            <v-col
                                cols="10"
                                sm="6"
                                class="mt-5"
                            
                            >
                                <h1 class="text-center black--text">Register</h1>
                                <body class="mt-10">Create your business account.  </body>
                                

                                <v-dialog
                                v-model="dialog_register"
                                persistent max-width="600px" 
                                min-width="360px"
                                @click:outside="dialog_register = false"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn 
                                            color="black"
                                            rounded
                                            class="mt-10"
                                            v-bind="attrs"
                                            v-on="on"
                                        >

                                        Register
                                        </v-btn>
                                    </template>

                                    <v-card>
                                        <v-tabs v-model="tab" show-arrows background-color="black" icons-and-text dark grow>
                                            <v-tabs-slider color="purple darken-4"></v-tabs-slider>
                                            <v-tab>
                                                <v-icon large>mdi-account-outline</v-icon>
                                                <div class="caption py-1">Register</div>
                                            </v-tab>
                                           
                                            <v-tab-item>
                                                <v-card class="px-4">
                                                    <v-card-text>
                                                        <v-form ref="registerForm" v-model="valid_register" lazy-validation>
                                                            <v-row>
                                                                <v-col cols="12" sm="6" md="6">
                                                                    <v-text-field v-model="firstName" :rules="firstNameRules" label="First Name" maxlength="15" required></v-text-field>
                                                                </v-col>
                                                                <v-col cols="12" sm="6" md="6">
                                                                    <v-text-field v-model="lastName" :rules="lastNameRules" label="Last Name" maxlength="15" required></v-text-field>
                                                                </v-col>
                                                                <v-col cols="12">
                                                                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                                                                </v-col>
                                                                <v-col cols="12">
                                                                    <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                                                                </v-col>
                                                                <v-col cols="12">
                                                                    <v-text-field block v-model="verify" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Confirm Password" counter @click:append="show1 = !show1"></v-text-field>
                                                                </v-col>
                                                                <v-spacer></v-spacer>
                                                                <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                                                                    <v-btn x-large block :disabled="!valid_register" color="brown darken-2" class="white--text" @click="validate">Register</v-btn>
                                                                </v-col>
                                                            </v-row>
                                                        </v-form>
                                                    </v-card-text>
                                                </v-card>
                                            </v-tab-item>
                                        </v-tabs>
                                    </v-card>
                                    
                                </v-dialog>

                                
                                
                            </v-col>
                        </v-row>


                        
                    </div>    
                    </v-sheet>
                </v-col>
                

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
    name: 'Home',


    computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    }
  },
  methods: {
    validate() {
      if (this.$refs.loginForm.validate()) {
        // submit form to server/API here...
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },


    data: () => ({
        dialog: false,
        dialog_register: false,

   
        valid: true,
        valid_register: true,
        
        firstName: "",
        firstNameRules: [
            v => !!v || 'First Name is required',
            v => (v && v.length <= 15) || 'First Name must be less than 15 characters',
            v => /^[a-zA-Z]+$/.test(v) || 'First Name must be alphabet only',
            // condition for only alphabetical characters
            // v => /^[a-zA-Z]+$/.test(v) || 'First Name must be alphabetical'
        ],
        lastName: "",
        lastNameRules: [
            v => !!v || 'Last Name is required',
            v => (v && v.length <= 15) || 'Last Name must be less than 15 characters',
            v => /^[a-zA-Z]+$/.test(v) || 'Last Name must be alphabet only',

        ],
        password: "",
        verify: "",
        loginPassword: "",
        loginEmail: "",
        loginEmailRules: [
        v => !!v || "Required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],

        email: "",
        emailRules: [
        v => !!v || "Required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],

        show1: false,
        rules: {
        required: value => !!value || "Required.",
        min: v => (v && v.length >= 8) || "Min 8 characters"
        }

      
    }),

  }
</script>
