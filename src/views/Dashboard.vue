<template>
  <v-app id="inspire">
    <v-app-bar app color="grey darken-4" flat :elevation="2">
      <v-app-bar-nav-icon @click="drawer = true" dark></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">
        <pre>Inventory </pre>
      </v-toolbar-title>

      <v-tabs centered class="ml-n9" color="white" dark>
        <v-tab router to="/dashboard"> Dashboard </v-tab>

        <v-tab router to="/sales"> Sales </v-tab>

        <v-tab router to="/inventory"> Inventory </v-tab>

        <v-tab router to="/buffer"> Buffer </v-tab>
      </v-tabs>

      <v-tab router to="/account" class="white--text hidden-sm-and-down">
        {{ profile.businessName }}
      </v-tab>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
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
          <v-col cols="12" sm="8">
            <v-sheet min-height="70vh" rounded="lg" :elevation="10" dark>
              <v-container fluid class="pa-2">
                <h3>Quantity sold per Product</h3>
                <v-sparkline
                  :fill="false"
                  :labels="prodName"
                  :gradient="['#1feaea', '#ffd200', '#f72047']"
                  :line-width="0.5"
                  :padding="10"
                  :smooth="1"
                  :value="prodQuantity"
                  auto-draw
                ></v-sparkline>
                <v-divider></v-divider>

                <h3>Earning per Product</h3>
                <v-sparkline
                  :fill="false"
                  :labels="prodName"
                  :gradient="['#1feaea', '#ffd200', '#f72047']"
                  :line-width="0.5"
                  :padding="10"
                  :smooth="1"
                  :value="totalEarning"
                  auto-draw
                  :tooltip="totalEarning"
                ></v-sparkline>
              </v-container>

              <!--  -->
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="4">
            <v-sheet rounded="lg" min-height="70vh" :elevation="10" dark>
              <v-container fluid class="pl-16">
                <v-radio-group v-model="radios" mandatory>
                  <v-row>
                    <v-col>
                      <v-radio
                        label="Per Day"
                        color="orange"
                        value="perDay"
                      ></v-radio>
                    </v-col>
                    <v-col>
                      <v-radio
                        label="Date Range"
                        color="primary"
                        value="dateRange"
                      ></v-radio>
                    </v-col>
                  </v-row>
                </v-radio-group>
              </v-container>

              <v-container v-if="radios === 'perDay'">
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
                      v-model="date"
                      label="Select Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      color="orange"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>

                  <v-date-picker
                    v-model="date"
                    no-title
                    scrollable
                    @change="getGraph"
                  >
                    <v-spacer></v-spacer>

                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                  </v-date-picker>
                </v-menu>
                <h4>
                  The total earning on date "{{ date }}" is Rs {{ eachDayEarn }}
                </h4>
              </v-container>

              <v-container v-if="radios === 'dateRange'">
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
                      v-model="rangeDate"
                      label="Select Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      color="blue"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>

                  <v-date-picker
                    v-model="rangeDate"
                    range
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>

                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>

                     <v-btn text color="primary" @click="rangeDateGraph">
                      Ok
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
import firebase from "firebase";
import "firebase/auth";
import { db } from "../main";

export default {
  name: "Dashboard",
  data: () => ({
    drawer: false,
    group: null,

    user: firebase.auth().currentUser,
    profile: {},

    salesList: [],

    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    rangeDate: "",
    prodQuantity: [],
    prodName: [],
    prodPrice: [],

    dates: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    radios: null,
  }),

  methods: {
    async logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/");
        });
    },

    // filer salesList by date range
    async rangeDateGraph() {
      let startDate = (this.rangeDate[0]).split("-").reverse().join("/");
      let endDate = (this.rangeDate[1]).split("-").reverse().join("/");
      

      let sales = await db.collection("users")
        .doc(this.user.uid)
        .collection("salesList")
        .where("date", ">=", startDate)
        .where("date", "<=", endDate)
        .get();
        sales.forEach(doc => {
          console.log(doc.data());
        });



    },

    getGraph() {
      let selectDate = this.date.split("-").reverse().join("/");
      db.collection("users")
        .doc(this.user.uid)
        .collection("salesList")
        .where("date", "==", selectDate)
        .onSnapshot((snapshot) => {
          this.prodQuantity = [];
          this.prodName = [];
          this.prodPrice = [];
          snapshot.forEach((doc) => {
            this.prodQuantity.push(parseInt(doc.data().quantity));
            this.prodPrice.push(parseInt(doc.data().price));
            this.prodName.push(doc.data().name);
          });
        });
    },
  },

  mounted() {
    // for auto map on graph for current date
    this.getGraph();
  },

  computed: {
    totalEarning() {
      let eachProdEarn = [];
      for (
        let i = 0;
        i < Math.min(this.prodQuantity.length, this.prodPrice.length);
        i++
      ) {
        eachProdEarn[i] = this.prodQuantity[i] * this.prodPrice[i];
      }
      return eachProdEarn;
    },

    eachDayEarn() {
      let dayEarn = this.totalEarning.reduce(function (a, b) {
        return a + b;
      }, 0);
      return dayEarn;
    },
  },

  firestore() {
    return {
      profile: db.collection("profile").doc(this.user.uid),
      salesList: db
        .collection("users")
        .doc(this.user.uid)
        .collection("salesList")
        .orderBy("date"),
    };
  },
};
</script>
