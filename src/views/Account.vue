<template>
<v-app id="account">
    <v-app-bar
      app
      color="grey darken-4"
      flat
      :elevation="2"

    >
      <v-app-bar-nav-icon @click="drawer = true" dark></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text"> <pre>Inventory </pre></v-toolbar-title>



      <v-tabs
        centered
        class="ml-n9"
        color="white"
        dark
      >
        <v-tab router to="/dashboard" >
          Dashboard
        </v-tab>

        <v-tab router to="/sales" >
          Sales
        </v-tab>

        <v-tab router to="/inventory" >
          Inventory
        </v-tab>


        <v-tab router to="/buffer" >
          Buffer
        </v-tab>
      </v-tabs>

     
    </v-app-bar>


    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="red--text text--accent-4"
        >
          <v-list-item to="/payments">
            <v-list-item-icon>
              <v-icon>mdi-currency-inr</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Payments</v-list-item-title>
          </v-list-item>

          <v-list-item to="/account">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>



          <v-list-item to="/premium">
            <v-list-item-icon>
              <v-icon>mdi-bullhorn</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Premium</v-list-item-title>
          </v-list-item>

          <v-list-item >
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="logout">Logout</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>


    <v-main class="grey lighten-1 pt-4">
      <v-container>
        <h1 class="pl-3">Account</h1>
        <v-row>


          <v-col
            cols="12"
            sm="8"
          >
            <v-sheet
              min-height="60vh"
              rounded="lg"
              :elevation="10"
              dark

            >

            <v-container
               class="pa-10"
                fluid 
            >

            <div
               
            >
                <h1 
                  class="text-center blue--text  pa-2"
                >    
                {{profile.businessName}}
                </h1>
              </div>
              <body class="text-center">
                {{profile.gst}}
              </body>

              <v-card class="pa-10 mt-10 text-center">

                <v-row>
                  

                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="profile.owner"
                      label="Owner Name"
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="user.metadata.creationTime"
                      label="Since"
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="profile.contact"
                      label="Contact Number"
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="user.email"
                      label="Email"
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="12"
                  >
                    <v-text-field
                      v-model="profile.address"
                      label="Address"
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>


              </v-card>
              
                    


            </v-container>
          
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="4"
          >
            <v-sheet
              rounded="lg"
              min-height="10vh"
              :elevation="10"
              dark

            >

            <v-container
             class="text-center black light-green--text "
             
             >

              <h2>Shop Profile</h2>
            </v-container>
            <v-divider></v-divider>

            
              <v-container>

                   
            <v-form 
                @submit.prevent="update"
                ref="form"
              >
        
              <v-row>
                <v-col
                  cols="12"
                  sm="12"
                >
                  <v-card
                    class="pa-5"
                  >
                   
                    <v-card-text>
                      <v-text-field
                        label="Business Name"
                        v-model="shop.businessName"
                        :rules="[
                        v => !!v || 'required',
                        v => v.length <= 30 || 'must be less than 30 characters',
                        v => v.length >= 3 || 'must be greater than 3 characters',
                        ]"
                        required
                      ></v-text-field>
                      <v-text-field
                        label="Owner Name"
                        v-model="shop.owner"
                        :rules="[
                        v => !!v || 'Owner Name is required',
                        v => v.length <= 30 || 'Owner Name must be less than 30 characters',
                        v => v.length >= 3 || 'Owner Name must be greater than 3 characters',
                        ]"
                        required
                      ></v-text-field>
                      <v-text-field
                        label="Shop Address"
                        v-model="shop.address"
                        :rules="[
                        v => !!v || 'Shop Address is required',
                        v => v.length <= 100 || 'Shop Address must be less than 100 characters'
                        ]"
                        required
                      ></v-text-field>
                      <v-text-field
                        label="Contact Number"
                        v-model="shop.contact"
                        :rules="[
                        v => !!v || 'Shop Contact is required',
                        v => v.length === 10 || 'Shop Contact must be 10 digits',
                        v => /^[0-9]+$/.test(v) || 'Contact must be number',
                        ]"
                        required
                      ></v-text-field>
                      
                      <v-text-field
                        label="Shop GSTIN (Optional)"
                        v-model="shop.gst"
                        :rules="
                        [

                          v => v.length <= 15 || 'Shop GSTIN must be less than 15 characters',

                        ]" 
                           
                        required = "false"
                      ></v-text-field>

                      
                      
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

            </v-form>


              </v-container>


              <v-container
               class="text-center  pa-7"
              >

                <v-btn
                  @click="update"
                >
                  Update
                </v-btn>
                &nbsp;&nbsp;
                <v-btn
                  @click="clear"
                >
                  Clear
                </v-btn>
            </v-container>



            </v-sheet>
              </v-col>

              
        </v-row>

      </v-container>


    </v-main>
  </v-app>
</template>

<script>
  
  import firebase from 'firebase';
  import "firebase/auth";
  import { db } from '../main';
// import firebase_admin from firebase
    
     

  export default {
    name: 'Accounts',
    data: () => ({

      user : firebase.auth().currentUser,
      profile : {},
    
      drawer:false,
      group: null,
      shop: {
        businessName: '',
        owner: '',
        address: '',
        contact: '',
        gst: '',
      },


     
      

    }),

    methods: {
      async logout(){
        firebase
        .auth()
        .signOut()
        .then(
          () => {
          this.$router.push("/");
          }
        )
    },


     update(){
      // update only if validate
      if(this.$refs.form.validate()){

        const { businessName, owner, address, contact, gst } = this.shop;
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        const shop = {
          businessName,
          owner,
          address,
          contact,
          gst,
        };
        db.collection('profile').doc(uid).set(shop);


        
        // clear
        this.shop.businessName = '';
        this.shop.owner = '';
        this.shop.address = '';
        this.shop.contact = '';
        this.shop.gst = '';
      }

      


      
      
    },

    clear(){
        this.shop.businessName = '';
        this.shop.owner = '';
        this.shop.address = '';
        this.shop.contact = '';
        this.shop.gst = '';
      }
      
       
    },



    firestore() {
      const user = firebase.auth().currentUser;
      return {
      profile:db.collection('profile').doc(user.uid)
      
      }
    },




  }
</script>