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

      <v-avatar
        class="hidden-sm-and-down"
        color="white darken-1 shrink"
        size="32"
      >
      <v-icon>mdi-calendar-clock</v-icon>
      </v-avatar>
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


    <v-main class="grey lighten-1 pt-14">
      <v-container>
        <h1 class="pl-3">Account</h1>
        <v-row>


          <v-col
            cols="12"
            sm="8"
          >
            <v-sheet
              min-height="63vh"
              rounded="lg"
              :elevation="10"
              dark

            >

            <v-container
               class="pa-12"
                fluid 
            >

            <div
               
            >
                <h1 
                  class="text-center pa-5"
                >    
                {{profileList.name}}
                </h1>
              </div>
              <body class="text-center">
                GSTIN:  dklsflsdfslkfj<br>
              </body>

              <v-card class="pa-10 mt-10 text-center">

                <v-row>
                  

                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      value="John Doe"
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
                      value="John Doe"
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
                      value="John Doe"
                      label="Email"
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      value="John Doe"
                      label="Contact Number"
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="12"
                  >
                    <v-text-field
                      value="John Doe"
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
                        label="Shop Name"
                        v-model="shop.name"
                        :rules="[
                        v => !!v || 'Shop Name is required',
                        v => v.length <= 20 || 'Shop Name must be less than 20 characters',
                        v => v.length >= 3 || 'Shop Name must be greater than 3 characters',
                        ]"
                        required
                      ></v-text-field>
                      <v-text-field
                        label="Owner Name"
                        v-model="shop.owner"
                        :rules="[
                        v => !!v || 'Shop Name is required',
                        v => v.length <= 30 || 'Shop Name must be less than 30 characters',
                        v => v.length >= 3 || 'Shop Name must be greater than 3 characters',
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
                        label="Email"
                        v-model="shop.email"
                        :rules="[
                        v => !!v || 'Shop Email is required',
                        v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Please enter a valid email',
                        v => v.length <= 50 || 'Shop Email must be less than 50 characters'
                        ]"
                        required
                      ></v-text-field>
                      <v-text-field
                        label="Shop GSTIN (Optional)"
                        v-model="shop.gst"
                        :rules="
                        [
                        v => /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(v) || 'Invalid GSTIN',
                        v => v.length <= 15 || 'must be less than 15 characters',
                        
                        ]" 
                           
                        required
                      ></v-text-field>
                      
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

            </v-form>


              </v-container>


              <v-container
               class="text-center  pt-2"
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


  export default {
    name: 'Accounts',
    data: () => ({

      user : firebase.auth().currentUser,
      profileList : {},
    
      drawer:false,
      group: null,
      shop: {
        name: '',
        owner: '',
        address: '',
        contact: '',
        email: '',
        gst: '',
      },

      

    }),

    methods: {
      async logout(){
        firebase
        .auth()
        .signOut()
        .then(
          user => {
            console.log(user);
          }
        )
        this.$router.push('/');
    },


     update(){
      // update only if validate
      if(this.$refs.form.validate()){

        const { name, owner, address, contact, email, gst } = this.shop;
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        const shop = {
          name,
          owner,
          address,
          contact,
          email,
          gst,
        };
        db.collection('profile').doc(uid).set(shop);
        this.$router.push('/sales');


        
        // clear
        this.shop.name = '';
        this.shop.owner = '';
        this.shop.address = '';
        this.shop.contact = '';
        this.shop.email = '';
        this.shop.gst = '';
      }

      


      
      
    },

    clear(){
        this.shop.name = '';
        this.shop.owner = '';
        this.shop.address = '';
        this.shop.contact = '';
        this.shop.email = '';
        this.shop.gst = '';
      }
      
       
    },



    firestore() {
      return {
      profileList:db.collection('profile').doc(this.user.uid).orderBy('id', 'desc')
      
      }
    },




  }
</script>