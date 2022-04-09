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
            <v-sheet min-height="30vh" rounded="lg" :elevation="10" dark>
              <v-container fluid class="pa-2" v-if="radios === 'perDay' && prodName !=''">
                <body>Quantity sold per Product</body>
                <v-sparkline
                  :fill="false"
                  :labels="prodName"
                  :gradient="['#1feaea', '#ffd200', '#f72047']"
                  :line-width="0.7"
                  :padding="10"
                  :smooth="1"
                  :value="prodQuantity"
                  color="deep-purple lighten-3"
                  height="95"
                  auto-draw
                ></v-sparkline>
                <v-divider></v-divider>

                <body>Earning per Product</body>
                <v-sparkline
                  :fill="false"
                  :labels="prodName1"
                  :gradient="['#1feaea', '#ffd200', '#f72047']"
                  :line-width="0.7"
                  :padding="10"
                  :smooth="1"
                  :value="prodTotal"
                  height="95"
                  auto-draw
                ></v-sparkline>
              </v-container>

              <v-container fluid class="pa-2" v-if="radios === 'dateRange' && rangeTotal !=''">
                <body>Earning per day</body>
                <v-sparkline
                  :fill="false"
                  :labels="totalityDate"
                  :gradient="['#1feaea', '#ffd200', '#f72047']"
                  :line-width="0.7"
                  :padding="20"
                  :smooth="1"
                  :value="rangeTotal"
                  height="80"
                  auto-draw
                ></v-sparkline>
                <v-divider></v-divider>

                <body>Quantity sold per Product</body>
                <v-sparkline
                  :fill="false"
                  :labels="prodNameRange"
                  :gradient="['#1feaea', '#ffd200', '#f72047']"
                  :line-width="0.7"
                  :padding="10"
                  :smooth="1"
                  :value="prodQuantityRange"
                  height="80"
                  auto-draw
                ></v-sparkline>
                <v-divider></v-divider>

                <body>Earning per Product</body>
                <v-sparkline
                  :fill="false"
                  :labels="nameOfProductRange"
                  :gradient="['#1feaea', '#ffd200', '#f72047']"
                  :line-width="0.7"
                  :padding="10"
                  :smooth="1"
                  :value="rangeTotality"
                  height="80"
                  auto-draw
                ></v-sparkline>
                <v-divider></v-divider>

                <body>Total items sold on Each day in selected range</body>
                <v-sparkline
                  :fill="false"
                  :labels="newDate"
                  :gradient="['#1feaea', '#ffd200', '#f72047']"
                  :line-width="0.7"
                  :padding="20"
                  :smooth="1"
                  :value="newQuantity"
                  height="79"
                  auto-draw
                ></v-sparkline>
              </v-container>

              <!--  -->
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="4">
            <v-sheet rounded="lg" min-height="30vh" :elevation="10" dark>
              <v-container text-center class="pt-7">
                <v-row>
                  <v-col>
                    <v-btn color="orange">Sales</v-btn>
                  </v-col>

                  <v-col>
                    <v-btn color="purple">Inventory</v-btn>
                  </v-col>

                  <v-col>
                    <v-btn color="pink">Buffer</v-btn>
                  </v-col>
                </v-row>
              </v-container>

              <v-container fluid class="pl-16">
                <v-radio-group v-model="radios" mandatory>
                  <v-row>
                    <v-col>
                      <v-radio
                        label="Today"
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

              <v-container v-if="radios === 'perDay'" class="pb-7">
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
              </v-container>

              <v-container v-if="radios === 'perDay' && prodName !=''">
                <v-row>
                  <v-col
                    cols="6"
                    sm="4"
                    class="d-flex align-center justify-center"
                  >
                    <span class="mr-3">Day Before -</span>
                    <v-chip color="orange" label outlined>
                      {{ sumOfPreviousDate }}
                    </v-chip>
                  </v-col>
                  <v-col
                    cols="6"
                    sm="4"
                    class="d-flex align-center justify-center"
                  >
                    <span class="mr-3">Select Day -</span>
                    <v-chip color="orange" label outlined>
                      {{ eachDayEarn }}
                    </v-chip>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="4"
                    class="d-flex align-center justify-center"
                  >
                    <span class="display-1">{{ percentage }}%</span>
                    <v-icon
                      v-if="eachDayEarn > sumOfPreviousDate"
                      color="light-green"
                      class="display-1"
                      >mdi-arrow-up-thick</v-icon
                    >
                    <v-icon color="red" v-else class="display-1"
                      >mdi-arrow-down-thick</v-icon
                    >
                  </v-col>
                </v-row>
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
                      label="Select Date Range"
                      prepend-icon="mdi-calendar"
                      readonly
                      color="blue"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>

                  <v-date-picker v-model="rangeDate" range no-title scrollable>
                    <v-spacer></v-spacer>

                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>

                    <v-btn text color="primary" @click="rangeDateGraph">
                      Ok
                    </v-btn>
                  </v-date-picker>
                </v-menu>
                <body v-if="rangeTotal !=''">
                  Total earning on "{{ totalityDate }}" = Rs
                  {{ eachDayEarnRange }}
                </body>
                <body v-else class="display-1 text-center red--text">
                  Select a date range
                </body>
              </v-container>

              <v-container v-if="radios === 'perDay' && prodName !=''">
                <v-simple-table fixed-header height="220px" dark>
                  <template v-slot:default primary>
                    <h4 class="primary">Quantity sold per Product Data</h4>

                    <v-row class="mr-3 pt-3">
                      <v-col>
                        <thead>
                          <tr>
                            <th class="text-left black red--text">
                              Product Name
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in prodName" :key="item.index">
                            <td>{{ item }}</td>
                          </tr>
                        </tbody>
                      </v-col>

                      <v-col>
                        <thead>
                          <tr>
                            <th class="text-left black red--text">Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in prodQuantity" :key="item.index">
                            <td>{{ item }}</td>
                          </tr>
                        </tbody>
                      </v-col>
                    </v-row>
                  </template>
                </v-simple-table>
              </v-container>

              <v-container v-if="radios === 'perDay' && prodName !=''">
                <v-simple-table fixed-header height="250px" dark>
                  <template v-slot:default primary>
                    <h4 class="primary">Earning per Product</h4>

                    <v-row class="mr-3 pt-3">
                      <v-col>
                        <thead>
                          <tr>
                            <th class="text-left black red--text">
                              Product Name
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in prodName" :key="item.index">
                            <td>{{ item }}</td>
                          </tr>
                        </tbody>
                      </v-col>

                      <v-col>
                        <thead>
                          <tr>
                            <th class="text-left black red--text">Earning</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in prodTotal" :key="item.index">
                            <td>{{ item }}</td>
                          </tr>
                        </tbody>
                      </v-col>
                    </v-row>
                  </template>
                </v-simple-table>
                <body v-if="prodName !=''">
                  Total earning on "{{ date }}" = Rs {{ eachDayEarn }}
                </body>
                <body v-else class="display-1 text-center red--text">
                  Select a date, or <br> Enter some data 
                </body>
              </v-container>

              <!--  Range Data below -->

              <v-container v-if="radios === 'dateRange' && rangeTotal !=''">
                <v-simple-table fixed-header height="250px" dark>
                  <template v-slot:default primary>
                    <h4 class="primary">Earning per day</h4>

                    <v-row class="mr-3 pt-3">
                      <v-col>
                        <thead>
                          <tr>
                            <th class="text-left black red--text">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in totalityDate" :key="item.index">
                            <td>{{ item }}</td>
                          </tr>
                        </tbody>
                      </v-col>

                      <v-col>
                        <thead>
                          <tr>
                            <th class="text-left black red--text">Earning</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in rangeTotal" :key="item.index">
                            <td>{{ item }}</td>
                          </tr>
                        </tbody>
                      </v-col>
                    </v-row>
                  </template>
                </v-simple-table>
              </v-container>

              <v-container v-if="radios === 'dateRange' && rangeTotal !=''">
                <v-simple-table fixed-header height="300px" dark>
                  <template v-slot:default primary>
                    <h4 class="primary">Quantity sold per Product</h4>

                    <v-row class="mr-3 pt-3">
                      <v-col>
                        <thead>
                          <tr>
                            <th class="text-left black red--text">
                              Product Name
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in prodNameRange" :key="item.index">
                            <td>{{ item }}</td>
                          </tr>
                        </tbody>
                      </v-col>

                      <v-col>
                        <thead>
                          <tr>
                            <th class="text-left black red--text">Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="item in prodQuantityRange"
                            :key="item.index"
                          >
                            <td>{{ item }}</td>
                          </tr>
                        </tbody>
                      </v-col>
                    </v-row>
                  </template>
                </v-simple-table>
              </v-container>

              <v-container v-if="radios === 'dateRange' && rangeTotal !=''">
                <v-simple-table fixed-header height="300px" dark>
                  <template v-slot:default primary>
                    <h4 class="primary">Earning per Product</h4>

                    <v-row class="mr-3 pt-3">
                      <v-col>
                        <thead>
                          <tr>
                            <th class="text-left black red--text">
                              Product Name
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="item in nameOfProductRange"
                            :key="item.index"
                          >
                            <td>{{ item }}</td>
                          </tr>
                        </tbody>
                      </v-col>

                      <v-col>
                        <thead>
                          <tr>
                            <th class="text-left black red--text">Earning</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in rangeTotality" :key="item.index">
                            <td>{{ item }}</td>
                          </tr>
                        </tbody>
                      </v-col>
                    </v-row>
                  </template>
                </v-simple-table>
              </v-container>

              <v-container v-if="radios === 'dateRange' && rangeTotal !=''">
                <v-simple-table fixed-header height="283px" dark>
                  <template v-slot:default primary>
                    <h4 class="primary">
                      Total items sold on Each day in selected range
                    </h4>

                    <v-row class="mr-3 pt-3">
                      <v-col>
                        <thead>
                          <tr>
                            <th class="text-left black red--text">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in newDate" :key="item.index">
                            <td>{{ item }}</td>
                          </tr>
                        </tbody>
                      </v-col>

                      <v-col>
                        <thead>
                          <tr>
                            <th class="text-left black red--text">
                              No. of item
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in newQuantity" :key="item.index">
                            <td>{{ item }}</td>
                          </tr>
                        </tbody>
                      </v-col>
                    </v-row>
                  </template>
                </v-simple-table>
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
    prodName1: [],
    prodPrice: [],
    prodTotal: [],

    previousTotal: [],
    previousDate: [],

    rangeProdQuantity: [],
    rangeProdName: [],
    rangeProdPrice: [],
    storedRangeDate: [],

    newQuantity: [],
    newDate: [],

    prodQuantityRange: [],
    prodNameRange: [],
    prodPriceRange: [],
    rangeTotal: [],
    totalityDate: [],
    rangeTotality: [],
    nameOfProductRange: [],

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
      this.menu = false;
      let startDate = this.rangeDate[0].split("-").reverse().join("/");
      let endDate = this.rangeDate[1].split("-").reverse().join("/");

      let sales = await db
        .collection("users")
        .doc(this.user.uid)
        .collection("salesList")
        .where("date", ">=", startDate)
        .where("date", "<=", endDate)
        .get();

      this.rangeProdQuantity = [];
      this.rangeProdName = [];
      this.rangeProdPrice = [];
      this.storedRangeDate = [];
      this.rangeTotal = [];
      sales.forEach((doc) => {
        this.rangeProdQuantity.push(parseInt(doc.data().quantity));
        this.rangeProdName.push(doc.data().name);
        this.rangeProdPrice.push(parseInt(doc.data().price));
        this.rangeTotal.push(parseInt(doc.data().total));
        this.storedRangeDate.push(doc.data().date);
      });

      // add quantity if same product is repeated

      this.prodQuantityRange = [];
      this.prodNameRange = [];

      for (let i = 0; i < this.rangeProdName.length; i++) {
        if (this.prodNameRange.includes(this.rangeProdName[i])) {
          let index = this.prodNameRange.indexOf(this.rangeProdName[i]);
          this.prodQuantityRange[index] += this.rangeProdQuantity[i];
        } else {
          this.prodNameRange.push(this.rangeProdName[i]);
          this.prodQuantityRange.push(this.rangeProdQuantity[i]);
        }
      }

      // align price with the index of the product name
      this.prodPriceRange = [];
      for (let i = 0; i < this.prodNameRange.length; i++) {
        for (let j = 0; j < this.rangeProdName.length; j++) {
          if (this.prodNameRange[i] === this.rangeProdName[j]) {
            this.prodPriceRange.push(this.rangeProdPrice[j]);
          }
        }
      }

      // add quantity if same date is repeated

      let quantity = [];
      let date = [];
      sales.forEach((doc) => {
        quantity.push(parseInt(doc.data().quantity));
        date.push(doc.data().date);
      });

      this.newQuantity = [];
      this.newDate = [];
      let count = 0;
      for (let i = 0; i < quantity.length; i++) {
        if (i === 0) {
          this.newQuantity.push(quantity[i]);
          this.newDate.push(date[i]);
        } else {
          if (date[i] === date[i - 1]) {
            this.newQuantity[count] += quantity[i];
          } else {
            count++;
            this.newQuantity.push(quantity[i]);
            this.newDate.push(date[i]);
          }
        }
      }

      // add total earning if same date is repeated

      let totality = [];
      let dDate = [];
      sales.forEach((doc) => {
        totality.push(parseInt(doc.data().total));
        dDate.push(doc.data().date);
      });

      this.rangeTotal = [];
      this.totalityDate = [];
      let count3 = 0;
      for (let i = 0; i < totality.length; i++) {
        if (i === 0) {
          this.rangeTotal.push(totality[i]);
          this.totalityDate.push(dDate[i]);
        } else {
          if (dDate[i] === dDate[i - 1]) {
            this.rangeTotal[count3] += totality[i];
          } else {
            count3++;
            this.rangeTotal.push(totality[i]);
            this.totalityDate.push(dDate[i]);
          }
        }
      }

      // add total if same product is repeated

      let totality2 = [];
      let nameOfProduct = [];
      sales.forEach((doc) => {
        totality2.push(parseInt(doc.data().total));
        nameOfProduct.push(doc.data().name);
      });

      let rangeTotality1 = [];
      let nameOfProductRange1 = [];
      let count4 = 0;
      for (let i = 0; i < totality2.length; i++) {
        if (i === 0) {
          rangeTotality1.push(totality2[i]);
          nameOfProductRange1.push(nameOfProduct[i]);
        } else {
          if (nameOfProduct[i] === nameOfProduct[i - 1]) {
            rangeTotality1[count4] += totality2[i];
          } else {
            count4++;
            rangeTotality1.push(totality2[i]);
            nameOfProductRange1.push(nameOfProduct[i]);
          }
        }
      }

      // add total if same Product is repeated

      this.rangeTotality = [];
      this.nameOfProductRange = [];
      for (let i = 0; i < rangeTotality1.length; i++) {
        if (this.nameOfProductRange.includes(nameOfProductRange1[i])) {
          let index = this.nameOfProductRange.indexOf(nameOfProductRange1[i]);
          this.rangeTotality[index] += rangeTotality1[i];
        } else {
          this.nameOfProductRange.push(nameOfProductRange1[i]);
          this.rangeTotality.push(rangeTotality1[i]);
        }
      }
    },

    getGraph() {
      // get the data from the below method
      this.previousDateData();

      let selectDate = this.date.split("-").reverse().join("/");
      db.collection("users")
        .doc(this.user.uid)
        .collection("salesList")
        .where("date", "==", selectDate)
        .onSnapshot((snapshot) => {
          this.prodQuantity = [];
          this.prodName = [];
          this.prodName1 = [];
          this.prodPrice = [];
          this.prodTotal = [];
          snapshot.forEach((doc) => {
            // add quantity if same product is repeated
            if (this.prodName.includes(doc.data().name)) {
              let index = this.prodName.indexOf(doc.data().name);
              this.prodQuantity[index] += parseInt(doc.data().quantity);
            } else {
              this.prodName.push(doc.data().name);
              this.prodQuantity.push(parseInt(doc.data().quantity));
            }

            // add total earning if same product is repeated
            if (this.prodName1.includes(doc.data().name)) {
              let index = this.prodName1.indexOf(doc.data().name);
              this.prodTotal[index] += parseInt(doc.data().total);
            } else {
              this.prodName1.push(doc.data().name);
              this.prodTotal.push(parseInt(doc.data().total));
            }
          });
        });
    },

    previousDateData() {
      let todayDate = this.date;
      // convert date to previous date
      let date1 = new Date(todayDate);
      let date2 = new Date(date1);
      date2.setDate(date1.getDate() - 1);
      // convert date2 into iso format
      let date4 = date2.toISOString().split("T")[0];
      let selectDate2 = date4.split("-").reverse().join("/");

      db.collection("users")
        .doc(this.user.uid)
        .collection("salesList")
        .where("date", "==", selectDate2)
        .onSnapshot((snapshot) => {
          (this.previousTotal = []),
            (this.previousDate = selectDate2),
            snapshot.forEach((doc) => {
              this.previousTotal.push(parseInt(doc.data().total));
            });
        });
    },
  },

  mounted() {
    // for auto map on graph for current date
    this.getGraph();
  },

  computed: {
    eachDayEarn() {
      let dayEarn = this.prodTotal.reduce(function (a, b) {
        return a + b;
      }, 0);
      return dayEarn;
    },

    eachDayEarnRange() {
      let dayEarn = this.rangeTotal.reduce(function (a, b) {
        return a + b;
      }, 0);
      return dayEarn;
    },

    sumOfPreviousDate() {
      let sum = this.previousTotal.reduce(function (a, b) {
        return a + b;
      }, 0);
      return sum;
    },

    // percentage of gain if eachDayEarn is greater than sumOfPreviousDate
    percentage() {
      let percentage =
        ((this.eachDayEarn - this.sumOfPreviousDate) / this.sumOfPreviousDate) *
        100;
      // get percentage in 2 decimal
      return percentage.toFixed(2);
    },

    // for range graph
    // totalEarningRange() {
    //   let rangeProdEarn = [];
    //   for (
    //     let i = 0;
    //     i < Math.min(this.prodQuantityRange.length, this.prodPriceRange.length);
    //     i++
    //   ) {
    //     rangeProdEarn[i] = this.prodQuantityRange[i] * this.prodPriceRange[i];
    //   }
    //   return rangeProdEarn;
    // },

    // eachDayEarnRange() {
    //   let dayEarnrange = this.totalEarningRange.reduce(function (a, b) {
    //     return a + b;
    //   }, 0);
    //   return dayEarnrange;
    // },
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
