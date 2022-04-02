<template>
<v-app id="inspire">
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
        <h1 class="pl-3">Dashboard</h1>
        <v-row>


          <v-col
            cols="12"
            sm="8"
          >
            <v-sheet
              min-height="70vh"
              rounded="lg"
              :elevation="10"
              dark

            >



            <v-container fluid>
                <v-sparkline
                  :fill="false"
                  :labels="prodName"
                  :gradient="['#f72047', '#ffd200', '#1feaea']"
                  :line-width="0.5"
                  :padding="8"
                  :smooth="1"
                  :value="prodQuantity"
                  auto-draw
                ></v-sparkline>
              </v-container>





              <v-date-picker
                v-model="date"
              ></v-date-picker>

              


              <v-btn @click="getSalesList">
              click me
            </v-btn>


              <!--  -->
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="4"
          >
            <v-sheet
              rounded="lg"
              min-height="70vh"
              :elevation="10"
              dark
            >


              <v-container>


                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="dates"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dates"
                      label="Picker in menu"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="dates"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="menu = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(dates)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>

                
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
  
    import firebase from 'firebase';
     import "firebase/auth";
  import { db } from '../main';

  
  export default {
    name: 'Dashboard',
    data: () => ({
   
      drawer:false,
      group: null,

      user : firebase.auth().currentUser,
      profile : {},

      salesList : [],

      date: '',
      prodQuantity: [],
      prodName: [],


       dates: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,


       

      

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

    // filer salesList by date
    getSalesList(){
      let selectDate = ((this.date.split("-")).reverse()).join("/");
      db
        .collection("users")
        .doc(this.user.uid)
        .collection("salesList")
      .where("date", "==", selectDate)
      .onSnapshot(snapshot => {
        this.prodQuantity = [];
        this.prodName = [];
        snapshot.forEach(doc => {
          this.prodQuantity.push(parseInt(doc.data().quantity));
          this.prodName.push(doc.data().name);
          
        }
        
        );
      console.log(this.prodQuantity);
      console.log(this.prodName);

      }
      );
      console.log(selectDate);
    },
    
     

    
      
       
    },
    



    firestore() {
      return {
      profile:db.collection('profile').doc(this.user.uid),
      salesList: db
        .collection("users")
        .doc(this.user.uid)
        .collection("salesList")
        .orderBy("date"),
      }
    },

    

    

    

 
  } 
</script>
