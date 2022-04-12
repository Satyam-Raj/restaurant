<template>
  <v-app id="employee">
    <v-app-bar app color="grey darken-4" flat :elevation="2">
      <v-app-bar-nav-icon @click="drawer = true" dark></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">
        <pre>Crispy </pre>
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
        <h1 class="pl-3">Employee Management</h1>
        <v-row>
          <v-col cols="12" sm="8">
            <v-sheet
              min-height="85vh"
              min-width="92vw"
              rounded="lg"
              color="grey darken-4"
              dark
              :elevation="10"
            >
              <!-- Database data rendering below  -->

              <v-container v-for="item in dbEmployeeList" :key="item.id">
                <div class="col-md-10 col-sm-12 mx-auto">
                  <v-row class="pa-5">
                    <v-col cols="12" sm="12">
                      <v-expansion-panels inset focusable>
                        <v-expansion-panel>
                          <v-expansion-panel-header
                            color="grey darken-3"
                            class="white--text font-weight-bold"
                            >{{item.fullName}}</v-expansion-panel-header
                          >
                          <v-expansion-panel-content>
                            <v-container>
                              <v-row>
                                <v-col col="12" sm="3">
                                  <v-text-field
                                    v-model="item.fullName"
                                    label="Full Name"
                                    placeholder="Enter Full Name"
                                    outlined
                                    dense
                                    readonly
                                  ></v-text-field>
                                </v-col>

                                <v-col col="12" sm="9">
                                  <v-row>
                                    <v-col col="12" sm="3">
                                      <v-text-field
                                        v-model="item.January"
                                        value="January"
                                        outlined
                                        filled
                                        dense
                                        readonly
                                      ></v-text-field>
                                    </v-col>

                                    <v-col col="12" sm="9">
                                      <v-textarea
                                        v-model="item.janDescription"
                                        label="Description"
                                        auto-grow
                                        outlined
                                        shaped
                                        rows="1"
                                        readonly
                                      ></v-textarea>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col col="12" sm="3">
                                      <v-text-field
                                        v-model="item.February"
                                        value="February"
                                        outlined
                                        filled
                                        dense
                                        readonly
                                      ></v-text-field>
                                    </v-col>

                                    <v-col col="12" sm="9">
                                      <v-textarea
                                        v-model="item.febDescription"
                                        label="Description"
                                        auto-grow
                                        outlined
                                        shaped
                                        rows="1"
                                        readonly
                                      ></v-textarea>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col col="12" sm="3">
                                      <v-text-field
                                        v-model="item.March"
                                        value="March"
                                        outlined
                                        filled
                                        dense
                                        readonly
                                      ></v-text-field>
                                    </v-col>

                                    <v-col col="12" sm="9">
                                      <v-textarea
                                        v-model="item.marDescription"
                                        label="Description"
                                        auto-grow
                                        outlined
                                        shaped
                                        rows="1"
                                        readonly
                                      ></v-textarea>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col col="12" sm="3">
                                      <v-text-field
                                        value="April"
                                        v-model="item.April"
                                        outlined
                                        filled
                                        dense
                                        readonly
                                      ></v-text-field>
                                    </v-col>

                                    <v-col col="12" sm="9">
                                      <v-textarea
                                        label="Description"
                                        v-model="item.aprDescription"
                                        auto-grow
                                        outlined
                                        shaped
                                        rows="1"
                                        readonly
                                      ></v-textarea>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col col="12" sm="3">
                                      <v-text-field
                                        value="May"
                                        v-model="item.May"
                                        outlined
                                        filled
                                        dense
                                        readonly
                                      ></v-text-field>
                                    </v-col>

                                    <v-col col="12" sm="9">
                                      <v-textarea
                                        label="Description"
                                        v-model="item.mayDescription"
                                        auto-grow
                                        outlined
                                        shaped
                                        rows="1"
                                        readonly
                                      ></v-textarea>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col col="12" sm="3">
                                      <v-text-field
                                        value="June"
                                        v-model="item.June"
                                        outlined
                                        filled
                                        dense
                                        readonly
                                      ></v-text-field>
                                    </v-col>

                                    <v-col col="12" sm="9">
                                      <v-textarea
                                        label="Description"
                                        v-model="item.junDescription"
                                        auto-grow
                                        outlined
                                        shaped
                                        rows="1"
                                        readonly
                                      ></v-textarea>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col col="12" sm="3">
                                      <v-text-field
                                        value="July"
                                        v-model="item.July"
                                        outlined
                                        filled
                                        dense
                                        readonly
                                      ></v-text-field>
                                    </v-col>

                                    <v-col col="12" sm="9">
                                      <v-textarea
                                        label="Description"
                                        v-model="item.julDescription"
                                        auto-grow
                                        outlined
                                        shaped
                                        rows="1"
                                        readonly
                                      ></v-textarea>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col col="12" sm="3">
                                      <v-text-field
                                        value="August"
                                        v-model="item.August"
                                        outlined
                                        filled
                                        dense
                                        readonly
                                      ></v-text-field>
                                    </v-col>

                                    <v-col col="12" sm="9">
                                      <v-textarea
                                        label="Description"
                                        v-model="item.augDescription"
                                        auto-grow
                                        outlined
                                        shaped
                                        rows="1"
                                        readonly
                                      ></v-textarea>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col col="12" sm="3">
                                      <v-text-field
                                        value="September"
                                        v-model="item.September"
                                        outlined
                                        filled
                                        dense
                                        readonly
                                      ></v-text-field>
                                    </v-col>

                                    <v-col col="12" sm="9">
                                      <v-textarea
                                        label="Description"
                                        v-model="item.sepDescription"
                                        auto-grow
                                        outlined
                                        shaped
                                        rows="1"
                                        readonly
                                      ></v-textarea>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col col="12" sm="3">
                                      <v-text-field
                                        value="October"
                                        v-model="item.October"
                                        outlined
                                        filled
                                        dense
                                        readonly
                                      ></v-text-field>
                                    </v-col>

                                    <v-col col="12" sm="9">
                                      <v-textarea
                                        label="Description"
                                        v-model="item.octDescription"
                                        auto-grow
                                        outlined
                                        shaped
                                        rows="1"
                                        readonly
                                      ></v-textarea>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col col="12" sm="3">
                                      <v-text-field
                                        value="November"
                                        v-model="item.November"
                                        outlined
                                        filled
                                        dense
                                        readonly
                                      ></v-text-field>
                                    </v-col>

                                    <v-col col="12" sm="9">
                                      <v-textarea
                                        label="Description"
                                        v-model="item.novDescription"
                                        auto-grow
                                        outlined
                                        shaped
                                        rows="1"
                                        readonly
                                      ></v-textarea>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col col="12" sm="3">
                                      <v-text-field
                                        value="December"
                                        v-model="item.December"
                                        outlined
                                        filled
                                        dense
                                        readonly
                                      ></v-text-field>
                                    </v-col>

                                    <v-col col="12" sm="9">
                                      <v-textarea
                                        label="Description"
                                        v-model="item.decDescription"
                                        auto-grow
                                        outlined
                                        shaped
                                        rows="1"
                                        readonly
                                      ></v-textarea>
                                    </v-col>
                                  </v-row>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-col>
                  </v-row>
                </div>
              </v-container>

              <!--  Data entry form below-->

              <v-container v-for="(item, index) in employeeList" :key="index">
                <div class="col-md-11 col-sm-12 mx-auto">
                  <v-row class="pa-5">
                    <v-col cols="12" sm="11">
                      <v-expansion-panels inset focusable>
                        <v-expansion-panel>
                          <v-expansion-panel-header
                            color="grey darken-3"
                            class="white--text font-weight-bold"
                            >Enter Employee Details</v-expansion-panel-header
                          >
                          <v-expansion-panel-content>
                            <v-container>
                              <v-row>
                                <v-col col="12" sm="3">
                                  <v-text-field
                                    v-model="item.fullName"
                                    label="Full Name"
                                    placeholder="Enter Full Name"
                                    outlined
                                    dense
                                  ></v-text-field>
                                </v-col>

                                <v-col col="12" sm="9">
                                  <v-row>
                                    <v-col col="12" sm="3">
                                      <v-text-field
                                        v-model="item.January"
                                        value="January"
                                        outlined
                                        filled
                                        dense
                                        readonly
                                      ></v-text-field>
                                    </v-col>

                                    <v-col col="12" sm="9">
                                      <v-textarea
                                        v-model="item.janDescription"
                                        label="Description"
                                        auto-grow
                                        outlined
                                        shaped
                                        rows="1"
                                      ></v-textarea>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col col="12" sm="3">
                                      <v-text-field
                                        v-model="item.February"
                                        value="February"
                                        outlined
                                        filled
                                        dense
                                        readonly
                                      ></v-text-field>
                                    </v-col>

                                    <v-col col="12" sm="9">
                                      <v-textarea
                                        v-model="item.febDescription"
                                        label="Description"
                                        auto-grow
                                        outlined
                                        shaped
                                        rows="1"
                                      ></v-textarea>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col col="12" sm="3">
                                      <v-text-field
                                        v-model="item.March"
                                        value="March"
                                        outlined
                                        filled
                                        dense
                                        readonly
                                      ></v-text-field>
                                    </v-col>

                                    <v-col col="12" sm="9">
                                      <v-textarea
                                        v-model="item.marDescription"
                                        label="Description"
                                        auto-grow
                                        outlined
                                        shaped
                                        rows="1"
                                      ></v-textarea>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col col="12" sm="3">
                                      <v-text-field
                                        value="April"
                                        v-model="item.April"
                                        outlined
                                        filled
                                        dense
                                        readonly
                                      ></v-text-field>
                                    </v-col>

                                    <v-col col="12" sm="9">
                                      <v-textarea
                                        label="Description"
                                        v-model="item.aprDescription"
                                        auto-grow
                                        outlined
                                        shaped
                                        rows="1"
                                      ></v-textarea>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col col="12" sm="3">
                                      <v-text-field
                                        value="May"
                                        v-model="item.May"
                                        outlined
                                        filled
                                        dense
                                        readonly
                                      ></v-text-field>
                                    </v-col>

                                    <v-col col="12" sm="9">
                                      <v-textarea
                                        label="Description"
                                        v-model="item.mayDescription"
                                        auto-grow
                                        outlined
                                        shaped
                                        rows="1"
                                      ></v-textarea>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col col="12" sm="3">
                                      <v-text-field
                                        value="June"
                                        v-model="item.June"
                                        outlined
                                        filled
                                        dense
                                        readonly
                                      ></v-text-field>
                                    </v-col>

                                    <v-col col="12" sm="9">
                                      <v-textarea
                                        label="Description"
                                        v-model="item.junDescription"
                                        auto-grow
                                        outlined
                                        shaped
                                        rows="1"
                                      ></v-textarea>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col col="12" sm="3">
                                      <v-text-field
                                        value="July"
                                        v-model="item.July"
                                        outlined
                                        filled
                                        dense
                                        readonly
                                      ></v-text-field>
                                    </v-col>

                                    <v-col col="12" sm="9">
                                      <v-textarea
                                        label="Description"
                                        v-model="item.julDescription"
                                        auto-grow
                                        outlined
                                        shaped
                                        rows="1"
                                      ></v-textarea>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col col="12" sm="3">
                                      <v-text-field
                                        value="August"
                                        v-model="item.August"
                                        outlined
                                        filled
                                        dense
                                        readonly
                                      ></v-text-field>
                                    </v-col>

                                    <v-col col="12" sm="9">
                                      <v-textarea
                                        label="Description"
                                        v-model="item.augDescription"
                                        auto-grow
                                        outlined
                                        shaped
                                        rows="1"
                                      ></v-textarea>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col col="12" sm="3">
                                      <v-text-field
                                        value="September"
                                        v-model="item.September"
                                        outlined
                                        filled
                                        dense
                                        readonly
                                      ></v-text-field>
                                    </v-col>

                                    <v-col col="12" sm="9">
                                      <v-textarea
                                        label="Description"
                                        v-model="item.sepDescription"
                                        auto-grow
                                        outlined
                                        shaped
                                        rows="1"
                                      ></v-textarea>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col col="12" sm="3">
                                      <v-text-field
                                        value="October"
                                        v-model="item.October"
                                        outlined
                                        filled
                                        dense
                                        readonly
                                      ></v-text-field>
                                    </v-col>

                                    <v-col col="12" sm="9">
                                      <v-textarea
                                        label="Description"
                                        v-model="item.octDescription"
                                        auto-grow
                                        outlined
                                        shaped
                                        rows="1"
                                      ></v-textarea>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col col="12" sm="3">
                                      <v-text-field
                                        value="November"
                                        v-model="item.November"
                                        outlined
                                        filled
                                        dense
                                        readonly
                                      ></v-text-field>
                                    </v-col>

                                    <v-col col="12" sm="9">
                                      <v-textarea
                                        label="Description"
                                        v-model="item.novDescription"
                                        auto-grow
                                        outlined
                                        shaped
                                        rows="1"
                                      ></v-textarea>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col col="12" sm="3">
                                      <v-text-field
                                        value="December"
                                        v-model="item.December"
                                        outlined
                                        filled
                                        dense
                                        readonly
                                      ></v-text-field>
                                    </v-col>

                                    <v-col col="12" sm="9">
                                      <v-textarea
                                        label="Description"
                                        v-model="item.decDescription"
                                        auto-grow
                                        outlined
                                        shaped
                                        rows="1"
                                      ></v-textarea>
                                    </v-col>
                                  </v-row>
                                </v-col>
                                <v-container class="text-center pt-5">
                                  <v-btn @click="submit" class="primary">
                                    Submit
                                  </v-btn>
                                </v-container>
                              </v-row>
                            </v-container>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-col>

                    <v-col cols="12" sm="1">
                      <v-btn large block @click="deleteEmployee(item.id)">
                        <v-icon> mdi-delete </v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </div>
              </v-container>

              <v-container class="text-center col-md-3">
                <v-btn block color="grey darken-3" @click="addEmployee">
                  <v-icon> mdi-plus </v-icon>
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
import firebase from "firebase";
import "firebase/auth";
import { db } from "../main";

export default {
  name: "Employee",
  data: () => ({
    drawer: false,
    group: null,

    user: firebase.auth().currentUser,
    profile: {},

    dbEmployeeList: [],

    // Employee

    employeeList: [],

    fullName: "",

    January: "January",
    February: "February",
    March: "March",
    April: "April",
    May: "May",
    June: "June",
    July: "July",
    August: "August",
    September: "September",
    October: "October",
    November: "November",
    December: "December",

    janDescription: "",
    febDescription: "",
    marDescription: "",
    aprDescription: "",
    mayDescription: "",
    junDescription: "",
    julDescription: "",
    augDescription: "",
    sepDescription: "",
    octDescription: "",
    novDescription: "",
    decDescription: "",
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

    addEmployee() {
      this.employeeList.push({
        id: Date.now(),

        fullName: this.fullName,

        January: this.January,
        February: this.February,
        March: this.March,
        April: this.April,
        May: this.May,
        June: this.June,
        July: this.July,
        August: this.August,
        September: this.September,
        October: this.October,
        November: this.November,
        December: this.December,

        janDescription: this.janDescription,
        febDescription: this.febDescription,
        marDescription: this.marDescription,
        aprDescription: this.aprDescription,
        mayDescription: this.mayDescription,
        junDescription: this.junDescription,
        julDescription: this.julDescription,
        augDescription: this.augDescription,
        sepDescription: this.sepDescription,
        octDescription: this.octDescription,
        novDescription: this.novDescription,
        decDescription: this.decDescription,
      });
    },

    deleteEmployee(id) {
      this.employeeList = this.employeeList.filter((employee) => {
        return employee.id !== id;
      });
    },

    submit() {
      this.employeeList.forEach((item) => {
        db.collection("users")
          .doc(this.user.uid)
          .collection("employeeList")
          .add({
            id: item.id,
            fullName: item.fullName,
            January: item.January,
            February: item.February,
            March: item.March,
            April: item.April,
            May: item.May,
            June: item.June,
            July: item.July,
            August: item.August,
            September: item.September,
            October: item.October,
            November: item.November,
            December: item.December,
            janDescription: item.janDescription,
            febDescription: item.febDescription,
            marDescription: item.marDescription,
            aprDescription: item.aprDescription,
            mayDescription: item.mayDescription,
            junDescription: item.junDescription,
            julDescription: item.julDescription,
            augDescription: item.augDescription,
            sepDescription: item.sepDescription,
            octDescription: item.octDescription,
            novDescription: item.novDescription,
            decDescription: item.decDescription,
          });
      });
    },
  },

  firestore() {
    return {
      profile: db.collection("profile").doc(this.user.uid),
      dbEmployeeList: db
        .collection("users")
        .doc(this.user.uid)
        .collection("employeeList")
        .orderBy("id", "desc"),
    };
  },
};
</script>

