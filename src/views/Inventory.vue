<template>
<v-app id="inventory">
    <v-app-bar
      app
      color="white"
      flat
      :elevation="2"

    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-app-bar-title class="title">
        <div>WoW Inventory..</div>
      </v-app-bar-title>


      <v-tabs
        centered
        class="ml-n9"
        color="grey darken-1"
        
      >
        <v-tab router to="/" >
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
              <v-icon>mdi-calendar-clock</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Calendar</v-list-item-title>
          </v-list-item>

          <v-list-item to="/premium">
            <v-list-item-icon>
              <v-icon>mdi-bullhorn</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Premium</v-list-item-title>
          </v-list-item>

          <v-list-item to="/logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    


    <v-main class="grey lighten-3 pt-0">
      <v-container>
        <h1 class="pl-3">Inventory</h1>

        <v-row >
          
          <v-col
            cols="12"
            sm="8"
          >
            
            <v-sheet
              min-height="70vh"
              rounded="lg"
              :elevation="10"
            >
            <v-container>
              <v-card flat class="pa-2" >
                <v-layout row wrap >

                  <v-flex xs12 md6>
                    <div class="caption grey--text">Product Name</div>
                    <div>Rice</div>
                  </v-flex>

                  <v-flex xs6 sm4 md2>
                    <div class="caption grey--text">Quantity</div>
                    <div>12 Kg</div>
                  </v-flex>

                  <v-flex xs6 sm4 md2>
                    <div class="caption grey--text">Price</div>
                    <div>Rs 120</div>
                  </v-flex>

                  <v-flex xs2 sm4 md2>
                    <div class="caption grey--text">No. of item</div>
                    <div>43</div>
                  </v-flex>

                </v-layout>

              </v-card>
            </v-container>




                <v-divider></v-divider>


              <v-container>
              <v-card flat class="pa-2" >
                <v-layout row wrap>

                  <v-flex xs12 md6>
                    <div class="caption grey--text">Product Name</div>
                    <div >{{ name }}</div>
                  </v-flex>

                  <v-flex xs6 sm4 md2>
                    <div class="caption grey--text">Quantity</div>
                    <span class="text-decoration-line-through">{{quantity}}</span><span> Kg</span>
                  </v-flex>

                  <v-flex xs6 sm4 md2>
                    <div class="caption grey--text">Price</div>
                    <span>Rs</span><span> {{ price }}</span>
                  </v-flex>

                  <v-flex xs2 sm4 md2>
                    <div class="caption grey--text">No. of item</div>
                    <div>{{no_of_item}}</div>
                  </v-flex>

                </v-layout>



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

            >


            <!-- <v-container
             class="text-center red--text text--darken-2"
             
             >

              <h2>Data Entry</h2>
            </v-container>
            <v-divider></v-divider>

            
              <v-container >

                   
                
            
                  <v-form 
                    v-model="valid"
                    @submit.prevent="submit"
                    ref="data_feed"
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


              </v-container> -->


              <v-container>
              <v-btn
                @click="buttonClick"
              >
                click
              </v-btn>
            </v-container>




            
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  

  export default {
    name: 'Inventory',
    data: () => ({
      // links: [
      //   {title:'Dashboard', route: "/"},
      //   {title:'Inventory', route: "/inventory"},
      //   {title:'Sales', route: "/sales"},
      //   {title:'Buffer', route: "/buffer"},
        
      // ],
      drawer:false,
      group: null,

// form validation section below
      valid: false,
      
      name: '',
      nameRules: [
        v => !!v || 'required',
        v => v.length <= 30 || 'must be less than 10 characters',
        v => /^[a-z]+$/.test(v) || 'must be only alphabet',
      ],


      quantity: '',
      quantityRules: [
        v => !!v || 'required',
        v => v.length <= 6 || 'must be less than 5 characters',
        v => /^[0-9]+$/.test(v) || 'must be a number',
      ],

      price: '',
      priceRules: [
        v => !!v || 'required',
        v => v.length <= 7 || 'must be less than 7 characters',
        v => /^[0-9]+$/.test(v) || 'must be a number',
      ],


      no_of_item: '',
      no_of_itemRules: [
        v => !!v || 'required',
        v => v.length <= 5 || 'must be less than 5 characters',
        v => /^[0-9]+$/.test(v) || 'must be a number',
      ],


      // email: '',
      // emailRules: [
      //   v => !!v || 'E-mail is required',
      //   v => /.+@.+/.test(v) || 'E-mail must be valid',
      // ],

// form validation section above





        methods: {

          buttonClick(){
            console.log('clicked');
          }

        },


    
    }),

    


  }
</script>