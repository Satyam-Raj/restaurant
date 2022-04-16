<template>
  <v-app id="inventory">
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
        <v-row>
          <v-col>
            <h1 class="pl-3">Inventory</h1>
          </v-col>

          <v-col class="d-flex" cols="3" sm="1" xsm="12" align-end>
            <v-dialog
              v-model="dialogAdd"
              persistent
              max-width="1100px"
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
                  <v-container class="text-center black light-blue--text">
                    <h2>Add Product</h2>
                  </v-container>
                  <v-divider></v-divider>

                  <v-container>
                    <v-form
                      ref="prodForm"
                      @submit.prevent="addProduct, submitProduct"
                      v-for="(item, index) in addProductList"
                      :key="index"
                    >
                      <v-row>
                        <v-col cols="12" sm="11">
                          <v-text-field
                            v-model="item.addName"
                            :counter="30"
                            label="Product Name"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="1">
                          <v-btn block @click="deleteProduct(item.id)">
                            <v-icon> mdi-delete </v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>

                  <v-container class="text-center pa-5">
                    <v-btn large block @click="addProduct">
                      <v-icon> mdi-plus </v-icon>
                    </v-btn>
                  </v-container>

                  <v-container class="text-center pt-5">
                    <v-btn @click="submitProduct"> Submit </v-btn>
                    &nbsp;&nbsp;
                    <v-btn @click="closeProduct"> Close </v-btn>
                  </v-container>

                  <!--  -->
                </v-sheet>
              </v-card>
            </v-dialog>
          </v-col>

          <v-col class="d-flex" cols="4" sm="1" xsm="6" align-end>
            <v-dialog
              v-model="dialog"
              persistent
              max-width="1200px"
              min-width="360px"
              @click:outside="dialog = false"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  large
                  color="pink"
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
                  <v-container class="text-center black light-blue--text">
                    <h2>Inventory Entry</h2>
                  </v-container>
                  <v-divider></v-divider>

                  <v-container
                    v-for="(item, index) in addEntryList"
                    :key="index"
                  >
                    <v-form @submit.prevent="submit" ref="form">
                      <v-row>
                        <v-col class="d-flex" cols="12" sm="5">
                          <v-select
                            :items="
                              inventoryProduct.map((item) => item.addName)
                            "
                            v-model="item.name"
                            label="Select Product"
                          ></v-select>
                        </v-col>

                        <v-col cols="12" md="3">
                          <v-text-field
                            v-model="item.quantity"
                            :counter="5"
                            :rules="[
                              v => !!v || 'Quantity is required'
                            ]"
                            
                            label="Quantity"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                          <v-text-field
                            v-model="item.price"
                            :counter="5"
                            label="Price"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="1">
                          <v-btn large block @click="deleteEntry(item.id)">
                            <v-icon> mdi-delete </v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>

                  <v-container class="text-center pa-5">
                    <v-btn block @click="addEntry">
                      <v-icon> mdi-plus </v-icon>
                    </v-btn>
                  </v-container>

                  <v-container class="text-center pt-5">
                    <v-btn @click="submit"> Submit </v-btn>
                    &nbsp;&nbsp;
                    <v-btn @click="closeEntry"> Close </v-btn>
                  </v-container>

                  <!--  -->
                </v-sheet>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="12">
            <v-sheet min-height="70vh" rounded="lg" :elevation="10">
              <v-simple-table fixed-header height="879px" dark>
                <template v-slot:default primary>
                  <thead>
                    <tr>
                      <th class="text-left black">Product Name</th>
                      <th class="text-left black">Quantity (Kg)</th>
                      <th class="text-left black">Price (Rs)</th>
                      <th class="text-left black">Total (Rs)</th>
                      <th class="text-left black">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in inventoryList" :key="item.id">
                      <td>{{ item.name }}</td>
                      <td>{{ item.quantity }}</td>
                      <td>{{ item.price }}</td>
                      <td>{{ item.total }}</td>
                      <td>{{ item.date }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>

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
  name: "Inventory",
  data: () => ({
    drawer: false,
    group: null,
    dialog: false,
    dialogAdd: false,

    name: "",
    quantity: "",
    price: "",

    addProductList: [],
    addEntryList: [],
    addName: "",

    inventoryList: [],
    user: firebase.auth().currentUser,
    profile: {},

    nameRules: [
      (v) => !!v || "required",
      (v) => v.length <= 30 || "must be less than 10 characters",
      (v) => /^[a-zA-Z ]+$/.test(v) || "must be only alphabet and space",
    ],

    quantityRules: [
      (v) => !!v || "required",
      (v) => v.length <= 5 || "must be less than 5 characters",
      (v) => /^[0-9]+$/.test(v) || "must be only number",
    ],

    priceRules: [
      (v) => !!v || "required",
      (v) => v.length <= 7 || "must be less than 7 characters",
      (v) => /^[0-9]+$/.test(v) || "must be only number",
    ],
  }),

  methods: {
    // valid submit
    submit() {

       this.addEntryList.forEach((item) => {
         if (item.name == "" || item.quantity == "" || item.price == "") {
            alert("Please fill all the fields");
         }else if (isNaN(item.quantity) || isNaN(item.price)) {
            alert("Please enter valid number");
         }
         else{
          this.dialog = false;
          this.addEntryList = [];
          db.collection("users")
            .doc(this.user.uid)
            .collection("inventoryList")
            .add({
              id: Date.now(),
              name: item.name,
              quantity: item.quantity,
              price: item.price,
              total: item.quantity * item.price,
              date: new Date().toLocaleDateString("fr-FR"),
            });
            }
        });
    },

    addProduct() {
      this.addProductList.push({
        id: Date.now(),
        addName: "",
      });
    },
    deleteProduct(id) {
      this.addProductList = this.addProductList.filter(
        (item) => item.id !== id
      );
    },

    closeEntry() {
      this.dialog = false;
      this.addEntryList = [];
    },

    closeProduct() {
      this.dialogAdd = false;
      this.addProductList = [];
    },

    submitProduct() {
      this.addProductList.forEach((item) => {
        if (item.addName == "" || item.addName.length > 30) {
          alert("Please fill Product Name correctly");
        } else {
          this.dialogAdd = false;
          this.addProductList = [];

          db.collection("users")
            .doc(this.user.uid)
            .collection("inventoryProduct")
            .add({
              id: item.id,
              addName: item.addName,
            });
        }
      });
    },

    addEntry() {
      this.addEntryList.push({
        id: Date.now(),
        name: "",
        quantity: "",
        price: "",
      });
    },

    deleteEntry(id) {
      this.addEntryList = this.addEntryList.filter((item) => item.id !== id);
    },

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
      inventoryList: db
        .collection("users")
        .doc(this.user.uid)
        .collection("inventoryList")
        .orderBy("id", "desc"),
      profile: db.collection("profile").doc(this.user.uid),
      inventoryProduct: db
        .collection("users")
        .doc(this.user.uid)
        .collection("inventoryProduct")
        .orderBy("id", "desc"),
    };
  },
};
</script>