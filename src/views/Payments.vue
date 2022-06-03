<template>
  <v-app id="inventory">
    <v-app-bar app color="grey darken-4" flat :elevation="2">
      <v-app-bar-nav-icon @click="drawer = true" dark></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">
        <pre>Crispicy </pre>
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
        <v-row>
          <v-col col="6" sm="11">
            <h1 class="pl-3">Payments</h1>
          </v-col>
          <v-col col="6" sm="1">
            <v-select
              :items="[
                'PayTm',
                'GPay',
                'UPI',
                'PhonePe',
                'Online',
                'Cash',
                'Dues',
              ]"
              label="Filter"
              class="red--text"
              multiple
              dense
              v-model="filter"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12">
            <v-sheet min-height="50vh" rounded="lg" :elevation="10">
              <v-simple-table fixed-header height="830px" dark>
                <template v-slot:default primary>
                  <thead>
                    <tr>
                      <th class="text-left black">Product Name</th>
                      <th class="text-left black">Quantity</th>
                      <th class="text-left black accent-1">Price (Rs)</th>
                      <th class="text-left black accent-1">Total (Rs)</th>
                      <th class="text-left black accent-1">Description</th>
                      <th class="text-left black accent-1">Payment</th>
                      <th class="text-left black accent-1">Date</th>
                    </tr>
                  </thead>
                  <tbody v-for="(fill, index) in filter" :key="index">
                    <tr v-for="item in salesList" :key="item.id">
                      <td v-if="item.paymentMode === fill">{{ item.name }}</td>
                      <td v-if="item.paymentMode === fill">
                        {{ item.quantity }}
                      </td>
                      <td v-if="item.paymentMode === fill">{{ item.price }}</td>
                      <td v-if="item.paymentMode === fill">{{ item.total }}</td>
                      <td v-if="item.paymentMode === fill">
                        {{ item.description }}
                      </td>
                      <td v-if="item.paymentMode === fill" class="orange--text">
                        {{ item.paymentMode }}
                      </td>
                      <td v-if="item.paymentMode === fill">{{ item.date }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
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
  name: "Payments",
  data: () => ({
    drawer: false,
    group: null,

    paymentList: [],
    user: firebase.auth().currentUser,
    profile: {},

    salesList: [],
    filter: "",
  }),

  methods: {
    // logout function below

    async logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/");
        });
    },
  },

  firestore() {
    return {
      paymentList: db
        .collection("users")
        .doc(this.user.uid)
        .collection("paymentList")
        .orderBy("id", "desc"),
      profile: db.collection("profile").doc(this.user.uid),
      salesList: db
        .collection("users")
        .doc(this.user.uid)
        .collection("salesList")
        .orderBy("id", "desc"),
    };
  },
};
</script>