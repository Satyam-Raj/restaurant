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

      <v-tab router to="/account" class="white--text hidden-sm-and-down">
          {{profile.businessName}}
        </v-tab>
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

          <v-list-item to="/employee">
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Employee</v-list-item-title>
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
        <h1 class="pl-3">Payments</h1>
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
                        <th class="text-left black">
                          Person Name
                        </th>
                        <th class="text-left black">
                          Product Name
                        </th>
                        <th class="text-left black">
                          Quantity
                        </th>
                        <th class="text-left black">
                          Dues Amount (Rs)
                        </th>
                        <th class="text-left black">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="item in paymentList"
                        :key="item.id"
                      >
                        <td>{{ item.personName }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>{{ item.price }}</td>
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
             class="text-center black orange--text"
             >

              <h2>Payments Entry</h2>
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
                            v-model="personName"
                            :rules="personNameRules"
                            :counter="30"
                            label="Person Name"
                            required
                          ></v-text-field>
                        </v-col>
                        
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
    name: 'Payments',
    data: () => ({
      drawer:false,
      group: null,

      name: '',
      quantity: '',
      price: '',
      personName: '',

      paymentList: [],
      user : firebase.auth().currentUser,
      profile : {},



      personNameRules: [
        v => !!v || 'required',
        v => v.length <= 30 || 'must be less than 10 characters',
        v => /^[a-zA-Z ]+$/.test(v) || 'must be only alphabet and space',
      ],

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
          db.collection('users').doc(this.user.uid).collection('paymentList').add({
            id: Date.now(),
            personName: this.personName,
            name: this.name,
            quantity: this.quantity,
            price: this.price,
            date: new Date().toLocaleDateString("fr-FR"),
          });

          // clear input
          this.name = '';
          this.quantity = '';
          this.price = '';
          this.personName = '';
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
        this.personName = ''
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
      paymentList:db.collection('users').doc(this.user.uid).collection('paymentList').orderBy('id', 'desc'),
      profile:db.collection('profile').doc(this.user.uid),
      
      }
    },




  }
</script>