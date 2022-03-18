<template>
<v-app id="inventory">
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

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="logout">Logout</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>


    <v-main class="grey lighten-1 pt-0">
      <v-container>
        <h1 class="pl-3">Inventory</h1>
        <v-row>


          <v-col
            cols="12"
            sm="8"
          >
            <v-sheet
              min-height="70vh"
              rounded="lg"
              :elevation="10"

            >





                <v-simple-table
                  fixed-header
                  height="879px"
                  dark
                >
                  <template v-slot:default primary >
                    <thead  >
                      <tr>
                        <th class="text-left black ">
                          Product Name
                        </th>
                        <th class="text-left black ">
                          Quantity (Kg)
                        </th>
                        <th class="text-left black ">
                          Price (Rs)
                        </th>
                        <th class="text-left black ">
                          No. of item
                        </th>
                        <th class="text-left black ">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="item in inventoryList"
                        :key="item.id"
                      >
                        <td>{{ item.name }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>{{ item.price }}</td>
                        <td>{{ item.no_of_item }}</td>
                        <td>{{ item.date }}</td>


                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>




          
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
              color="grey darken-2"
              dark

            >

            <v-container
             class="text-center black light-blue--text"
             >

              <h2>Inventory Entry</h2>
            </v-container>
            <v-divider></v-divider>

            
              <v-container >

                   
                
            
                  <v-form 
                    @submit.prevent="submit"
                    ref="form"

                  >
                      <v-row>
                        
                        <v-col
                          cols="12"
                          md="3"
                        >
                          <v-text-field
                            v-model="name"
                            :rules="nameRules"
                            :counter="30"
                            label="Product Name"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col
                          cols="12"
                          md="3"
                        >
                          <v-text-field
                            v-model="quantity"
                            :rules="quantityRules"
                            :counter="5"
                            label="Quantity"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col
                          cols="12"
                          md="3"
                        >
                          <v-text-field
                            v-model="price"
                            :rules="priceRules"
                            :counter="7"
                            label="Price"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col
                          cols="12"
                          md="3"
                        >
                          <v-text-field
                            v-model="no_of_item"
                            :rules="no_of_itemRules"
                            :counter="5"
                            label="No. of item"
                            required
                          ></v-text-field>
                        </v-col>


                      </v-row>


                  </v-form>


              </v-container>



            <v-container
              class="text-center  pt-5"
             
             >

              <v-btn
                @click="submit"
              >
                Submit
              </v-btn>
              &nbsp;&nbsp;
              <v-btn
                @click="clear"
              >
                Clear
              </v-btn>
            </v-container>




            
              <!--  -->
            </v-sheet>



<!-- calender below -->
<!--             
                <v-container class="pt-14">            
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          label="Choose Date"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date"
                        @input="menu2 = false"
                      ></v-date-picker>
                    </v-menu>
                    </v-col>
                  </v-container> -->
<!-- calender above -->


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
    name: 'Inventory',
    data: () => ({
      drawer:false,
      group: null,

      name: '',
      quantity: '',
      price: '',
      no_of_item: '',

      inventoryList: [],
      user : firebase.auth().currentUser,

      


      nameRules: [
        v => !!v || 'required',
        v => v.length <= 30 || 'must be less than 10 characters',
        v => /^[a-zA-Z ]+$/.test(v) || 'must be only alphabet and space',
      ],

      quantityRules: [
        v => !!v || 'required',
        v => v.length <= 5 || 'must be less than 5 characters',
        v => /^[0-9]+$/.test(v) || 'must be only number',
      ],

      priceRules: [
        v => !!v || 'required',
        v => v.length <= 7 || 'must be less than 7 characters',
        v => /^[0-9]+$/.test(v) || 'must be only number',
      ],

      no_of_itemRules: [
        v => !!v || 'required',
        v => v.length <= 5 || 'must be less than 5 characters',
        v => /^[0-9]+$/.test(v) || 'must be only number',
      ],

      // condition for only alphabet and space
      // v => /^[a-zA-Z ]+$/.test(v) || 'must be only alphabet and space',

      // calender below

      // date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      // menu: false,
      // modal: false,
      // menu2: false,



    }),

    methods: {


      // valid submit
      submit() {
        if (this.$refs.form.validate()) {
          db.collection('users').doc(this.user.uid).collection('inventoryList').add({
            id: Date.now(),
            name: this.name,
            quantity: this.quantity,
            price: this.price,
            no_of_item: this.no_of_item,
            date: new Date().toLocaleDateString("fr-FR"),
          });

          // clear input
          this.name = '';
          this.quantity = '';
          this.price = '';
          this.no_of_item = '';
        }
      },
      // submit(){
      //   let newItem = {
      //     id: Date.now(),
      //     date: new Date().toLocaleDateString("fr-FR"),
      //     name: this.name,
      //     quantity: this.quantity,
      //     price: this.price,
      //     no_of_item: this.no_of_item,
      //   }
      //   this.list.push(newItem)
      //   this.name = ''
      //   this.quantity = ''
      //   this.price = ''
      //   this.no_of_item = ''


      // },

      clear(){
        this.name = ''
        this.quantity = ''
        this.price = ''
        this.no_of_item = ''
      },


// logout function below

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
    },


     firestore() {
      return {
      inventoryList:db.collection('users').doc(this.user.uid).collection('inventoryList').orderBy('id', 'desc')
      
      }
    },




  }
</script>