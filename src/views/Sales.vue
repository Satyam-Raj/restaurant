<template>
  <v-app id="sales">
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
          <v-col>
            <h1 class="pl-3">Sales</h1>
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
                  <v-container class="text-center black yellow--text">
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
                            :rules="addNameRules"
                            :counter="30"
                            label="Product Name"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="1">
                          <v-btn large block @click="deleteProduct(item.id)">
                            <v-icon> mdi-delete </v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>

                  <v-container class="text-center pa-5">
                    <v-btn block @click="addProduct">
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
              max-width="1500px"
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
                  <v-container class="text-center black yellow--text">
                    <h2>Sales Entry</h2>
                  </v-container>
                  <v-divider></v-divider>

                  <v-container
                    v-for="(item, index) in addEntryList"
                    :key="index"
                  >
                    <v-form @submit.prevent="submit" ref="form">
                      <v-row>
                        <v-col class="d-flex" cols="12" sm="2">
                          <v-select
                            :items="ProductList.map((item) => item.addName)"
                            v-model="item.addProductName"
                            label="Select Product"
                          ></v-select>
                        </v-col>

                        <v-col cols="12" md="2">
                          <v-text-field
                            v-model="item.quantity"
                            :rules="quantityRules"
                            :counter="5"
                            label="Quantity"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="2">
                          <v-text-field
                            v-model="item.displayprice"
                            :rules="displaypriceRules"
                            :counter="5"
                            label="Price"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                          <v-text-field
                            v-model="item.description"
                            :rules="descriptionRules"
                            :counter="30"
                            label="Description"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="2">
                          <v-select
                            :items="payModeDrop.map((item) => item.text)"
                            v-model="item.payMode"
                            label="Payment Mode"
                          ></v-select>
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
              <v-simple-table fixed-header height="849px" dark>
                <template v-slot:default primary>
                  <thead>
                    <tr>
                      <th class="text-left black">Product Name</th>
                      <th class="text-left black">Quantity</th>
                      <th class="text-left black accent-1">Price (Rs)</th>
                      <th class="text-left black accent-1">Total (Rs)</th>
                      <th class="text-center black accent-1">Description</th>
                      <th class="text-center black accent-1">Payment</th>
                      <th class="text-center black accent-1">Date</th>
                      <th class="text-center black accent-1">Modify</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in salesList" :key="item.id">
                      <td>{{ item.name }}</td>
                      <td>{{ item.quantity }}</td>
                      <td>{{ item.price }}</td>
                      <td>{{ item.total }}</td>
                      <td class="text-center accent-1">
                        {{ item.description }}
                      </td>
                      <td
                        v-if="item.paymentMode === 'Dues'"
                        class="text-center red--text"
                      >
                        {{ item.paymentMode }}
                      </td>
                      <td v-else class="text-center accent-1">
                        {{ item.paymentMode }}
                      </td>
                      <td class="text-center accent-1">{{ item.date }}</td>
                      <td class="text-center accent-1">
                        <v-dialog
                          v-model="dialog2"
                          persistent
                          max-width="790"
                          :retain-focus="false"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              color="orange"
                              dark
                              v-bind="attrs"
                              v-on="on"
                              outlined
                              @click="editSales(item.id)"
                            >
                              <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                          </template>
                          <v-card>
                            <v-container
                              class="text-center primary white--text"
                            >
                              <h2>Edit Product details</h2>
                            </v-container>
                            <v-container>
                              <v-row>
                                <v-col class="d-flex" cols="12" sm="3">
                                  <v-select
                                    :items="
                                      ProductList.map((item) => item.addName)
                                    "
                                    v-model="edit.addProductName"
                                    label="Select Product"
                                  ></v-select>
                                </v-col>

                                <v-col cols="12" md="2">
                                  <v-text-field
                                    v-model="edit.quantity"
                                    :rules="quantityRules"
                                    :counter="5"
                                    label="Quantity"
                                    required
                                  ></v-text-field>
                                </v-col>

                                <v-col cols="12" md="2">
                                  <v-text-field
                                    v-model="edit.displayprice"
                                    :rules="displaypriceRules"
                                    :counter="5"
                                    label="Price"
                                    required
                                  ></v-text-field>
                                </v-col>

                                <v-col cols="12" md="3">
                                  <v-text-field
                                    v-model="edit.description"
                                    :rules="descriptionRules"
                                    :counter="30"
                                    label="Description"
                                    required
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="2">
                                  <v-select
                                    :items="
                                      payModeDrop.map((item) => item.text)
                                    "
                                    v-model="edit.payMode"
                                    label="Payment Mode"
                                  ></v-select>
                                </v-col>
                              </v-row>
                            </v-container>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="red darken-1"
                                text
                                outlined
                                @click="updateSales"
                              >
                                Yes
                              </v-btn>
                              <v-btn
                                color="primary"
                                text
                                outlined
                                @click="dialog2 = false"
                              >
                                Cancel
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </td>
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
  name: "Sales",
  data: () => ({
    drawer: false,
    group: null,
    dialog: false,
    dialog2: false,
    dialogAdd: false,

    addName: "",
    addProductList: [],
    addEntryList: [],
    addProductName: "",

    quantity: "",
    displayprice: "",
    description: "",
    payMode: "",

    edit: {
      addProductName: "",
      quantity: "",
      displayprice: "",
      description: "",
      payMode: "",
    },

    key: "",

    payModeDrop: [
      { text: "PayTm", value: "PayTm" },
      { text: "GPay", value: "GPay" },
      { text: "UPI", value: "UPI" },
      { text: "PhonePe", value: "PhonePe" },
      { text: "Online", value: "Online" },
      { text: "Cash", value: "Cash" },
      { text: "Dues", value: "Dues" },
    ],

    salesList: [],
    user: firebase.auth().currentUser,
    profile: {},

    addNameRules: [
      (v) => !!v || "required",
      (v) => v.length <= 30 || "must be less than 30 characters",
      (v) => /^[a-zA-Z ]+$/.test(v) || "must be only alphabet",
    ],

    quantityRules: [
      (v) => !!v || "required",
      (v) => v.length <= 5 || "must be less than 5 characters",
      (v) => /^[0-9]+$/.test(v) || "must be only number",
    ],

    displaypriceRules: [
      (v) => !!v || "required",
      (v) => v.length <= 7 || "must be less than 7 characters",
      (v) => /^[0-9]+$/.test(v) || "must be only number",
    ],

    descriptionRules: [
      (v) => !!v || "required",
      (v) => v.length <= 30 || "must be less than 30 characters",
    ],

    paymentModeRules: [
      (v) => !!v || "required",
      (v) => v.length <= 10 || "must be less than 10 characters",
      (v) => /^[a-zA-Z ]+$/.test(v) || "must be only alphabet",
    ],
  }),

  methods: {
    // valid submit

    submit() {
      this.addEntryList.forEach((item) => {
        // condition for form validation
        if (
          item.addProductName == "" ||
          item.quantity == "" ||
          item.displayprice == "" ||
          item.description == "" ||
          item.paymentMode == ""
        ) {
          alert("Please fill all the fields");
          // how to set nameRules
        } else if (isNaN(item.quantity) || isNaN(item.displayprice)) {
          alert("Quantity must be a number");
        } else if (item.quantity.length > 5) {
          alert("Quantity must be less than 5 digits");
        } else if (item.displayprice.length > 7) {
          alert("Price must be less than 7 digits");
        } else if (item.description.length > 30) {
          alert("Description must be less than 30 characters");
        } else {
          this.dialog = false;
          this.addEntryList = [];

          db.collection("users")
            .doc(this.user.uid)
            .collection("salesList")
            .add({
              id: Date.now(),
              name: item.addProductName,
              quantity: item.quantity,
              price: item.displayprice,
              description: item.description,
              paymentMode: item.payMode,
              total: item.quantity * item.displayprice,
              date: new Date().toLocaleDateString("fr-FR"),
            });
        }
      });

      // clear input
      this.name = "";
      this.quantity = "";
      this.displayprice = "";
      this.description = "";
      this.paymentMode = "";
    },

    clear() {
      this.name = "";
      this.quantity = "";
      this.displayprice = "";
      this.description = "";
      this.paymentMode = "";
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

    addProduct() {
      this.addProductList.push({
        id: Date.now(),
        addName: "",
      });
    },

    addEntry() {
      this.addEntryList.push({
        id: Date.now(),
        addProductName: "",
        quantity: "",
        displayprice: "",
        description: "",
        payMode: "",
      });
    },
    editSales(id) {
      db.collection("users")
        .doc(this.user.uid)
        .collection("salesList")
        .doc(id)
        .get()
        .then((doc) => {
          this.edit.addProductName = doc.data().name;
          this.edit.quantity = doc.data().quantity;
          this.edit.displayprice = doc.data().price;
          this.edit.description = doc.data().description;
          this.edit.payMode = doc.data().paymentMode;

          this.key = doc.id;
        });
    },
    deleteSales(id) {
      console.log(id);
    },
    updateSales() {
      this.dialog2 = false;

      db.collection("users")
        .doc(this.user.uid)
        .collection("salesList")
        .doc(this.key)
        .update({
          name: this.edit.addProductName,
          quantity: this.edit.quantity,
          price: this.edit.displayprice,
          description: this.edit.description,
          paymentMode: this.edit.payMode,
          total: this.edit.quantity * this.edit.displayprice,
        });
    },

    deleteEntry(id) {
      this.addEntryList = this.addEntryList.filter((item) => item.id !== id);
    },

    deleteProduct(id) {
      this.addProductList = this.addProductList.filter(
        (item) => item.id !== id
      );
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
            .collection("addProductList")
            .add({
              id: item.id,
              addName: item.addName,
            });
        }
      });
    },

    closeEntry() {
      this.dialog = false;
      this.addEntryList = [];
    },

    closeProduct() {
      this.dialogAdd = false;
      this.addProductList = [];
    },
  },

  firestore() {
    return {
      salesList: db
        .collection("users")
        .doc(this.user.uid)
        .collection("salesList")
        .orderBy("id", "desc"),
      profile: db.collection("profile").doc(this.user.uid),
      ProductList: db
        .collection("users")
        .doc(this.user.uid)
        .collection("addProductList")
        .orderBy("id", "desc"),
    };
  },
};
// let user = firebase.auth().currentUser;
</script>