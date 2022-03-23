<template>
<v-app id="sales">
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
          {{ profile.businessName}}
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


    <v-main class="grey lighten-1 pt-0">
      <v-container>

        <v-row>
           <v-col>
                <h1 class="pl-3">Sales</h1>
            </v-col>





            <v-col  class="d-flex" cols="3" sm="1" xsm="12" align-end>   

                    <v-dialog
                    v-model="dialogAdd"
                    persistent max-width="1500px" 
                    min-width="360px"
                    @click:outside="dialogAdd = false"
                    >

                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        large 
                        color="blue accent-4" 
                        :elevation="5"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        >

                        Add
                        
                        </v-btn>
                    </template>

                    <v-card>
                        <v-sheet
                          rounded="lg"
                          min-height="80vh"
                          min-width="50vw"
                          :elevation="10"
                          color="grey darken-2"
                          dark
                        >

                        <v-container
                        class="text-center black yellow--text "
                        >

                          <h2>Add Product</h2>
                        </v-container>
                        <v-divider></v-divider>
              
                          <v-container>    
                              <v-form 
                                @submit.prevent="submit"
                                ref="form"
                                v-on:keyup.enter="submit"

                              >
                                  <v-row>
                                    
                                    <v-col
                                      cols="12"
                                      md="6"
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
                                      md="6"
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
                            @click="submitAdd"
                          >
                            Submit
                          </v-btn>
                          &nbsp;&nbsp;
                          <v-btn
                            @click="clearAdd"
                          >
                            Clear
                          </v-btn>
                        </v-container>

                          <!--  -->
                        </v-sheet>
                    </v-card>
                    </v-dialog>
            </v-col>
             








            <v-col  class="d-flex" cols="4" sm="1" xsm="6" align-end>   

              <v-dialog
              v-model="dialog"
              persistent max-width="1500px" 
              min-width="360px"
              @click:outside="dialog = false"
              >

              <template v-slot:activator="{ on, attrs }">
                 <v-btn
                  large 
                  color="orange darken-3" 
                  :elevation="5"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  >

                  Entry
                  
                  </v-btn>
              </template>

              <v-card>
                  <v-sheet
                    rounded="lg"
                    min-height="80vh"
                    min-width="50vw"
                    :elevation="10"
                    color="grey darken-2"
                    dark
                  >

                  <v-container
                  class="text-center black yellow--text "
                  >

                    <h2>Sales Entry</h2>
                  </v-container>
                  <v-divider></v-divider>
         
                    <v-container>    
                        <v-form 
                          @submit.prevent="submit"
                          ref="form"
                          v-on:keyup.enter="submit"

                        >
                            <v-row>
                              
                              <v-col
                                class="d-flex"
                                cols="12"
                                sm="3"
                              >
                                <v-select
                                  :items="items"
                                  label="Select Product"
                                ></v-select>
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
                                  v-model="description"
                                  :rules="descriptionRules"
                                  :counter="30"
                                  label="Description"
                                  required
                                ></v-text-field>
                              </v-col>
                              <v-col
                                cols="12"
                                md="3"
                              >
                                <v-text-field
                                  v-model="paymentMode"
                                  :rules="paymentModeRules"
                                  :counter="5"
                                  label="Payment Mode"
                                  required
                                ></v-text-field>
                              </v-col>
                            </v-row>
                        </v-form>

                        
                    </v-container>

                    <v-btn> <v-icon> mdi-plus  </v-icon>  </v-btn>

                    

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
              </v-card>
              </v-dialog>
            </v-col>
       </v-row>

        <v-row>
          <v-col
            cols="12"
            sm="12"
          >
            <v-sheet
              min-height="70vh"
              rounded="lg"
              :elevation="10"
            >

                <v-simple-table
                  fixed-header
                  height="849px"
                  dark
                >
                  <template v-slot:default primary >
                    <thead  >
                      <tr>
                        <th class="text-left black" >
                          Product Name
                        </th>
                        <th class="text-left black">
                          Quantity
                        </th>
                        <th class="text-left black accent-1">
                          Price (Rs)
                        </th>
                        <th class="text-left black accent-1">
                          Total (Rs)
                        </th>
                        <th class="text-left black accent-1">
                          Description
                        </th>
                        <th class="text-left black accent-1">
                          Payment mode
                        </th>
                        <th class="text-left black accent-1">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="item in salesList"
                        :key="item.id"
                      >
                        <td>{{ item.name }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>{{ item.price }}</td>
                        <td>{{ item.quantity * item.price }}</td>
                        <td>{{ item.description }}</td>
                        <td>{{ item.paymentMode }}</td>
                        <td>{{ item.date }}</td>


                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>


              <!--  -->
            </v-sheet>
          </v-col>

        

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
    name: 'Sales',
    data: () => ({
      drawer:false,
      group: null,
      dialog : false,
      dialogAdd: false,

      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],

      name: '',
      quantity: '',
      price: '',
      description: '',
      paymentMode: '',

      salesList: [],
      user : firebase.auth().currentUser,
      profile : {},



      nameRules: [
        v => !!v || 'required',
        v => v.length <= 30 || 'must be less than 10 characters',
        v => /^[a-zA-Z ]+$/.test(v) || 'must be only alphabet',
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

      descriptionRules: [
        v => !!v || 'required',
        v => v.length <= 30 || 'must be less than 30 characters',
      ],

      paymentModeRules: [
        v => !!v || 'required',
        v => v.length <= 10 || 'must be less than 10 characters',
        v => /^[a-zA-Z ]+$/.test(v) || 'must be only alphabet',
      ],

      

   


    }),

    methods: {




      // valid submit
      submit() {
        if (this.$refs.form.validate()) {

         
              db.collection('users').doc(this.user.uid).collection('salesList').add({
                id: Date.now(),
                name: this.name,
                quantity: this.quantity,
                price: this.price,
                description: this.description,
                paymentMode: this.paymentMode,
                date: new Date().toLocaleDateString("fr-FR"),
              });



          // clear input
          this.name = '';
          this.quantity = '';
          this.price = '';
          this.description = '';
          this.paymentMode = '';
        }
      },

     


              // db.collection('salesList').doc(this.user.uid).set({
              //   userName : this.user.uid,
              //   id: Date.now(),
              //   name: this.name,
              //   quantity: this.quantity,
              //   price: this.price,
              //   no_of_item: this.no_of_item,
              //   date: new Date().toLocaleDateString("fr-FR"),
              // });

      



      clear(){
        this.name = ''
        this.quantity = ''
        this.price = ''
        this.description = ''
        this.paymentMode = ''
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
      salesList:db.collection('users').doc(this.user.uid).collection('salesList').orderBy('id', 'desc'),
      profile:db.collection('profile').doc(this.user.uid),
      }
    },


        
    






  }
  // let user = firebase.auth().currentUser;

</script>