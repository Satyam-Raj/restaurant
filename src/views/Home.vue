<template>
  <v-app id="home">
    <v-app-bar app color="grey darken-4" flat>
      <!-- Company name on top left -->
      
      <v-tabs centered color="white" dark>
        
        <v-tab router to="/"> Home </v-tab>

        <v-tab router to="/services"> Services </v-tab>

        <v-tab router to="/contact"> Contact Us </v-tab>
       
      </v-tabs>

      <!-- login and register button below -->
    </v-app-bar>

    <v-main class="pt-5 grey lighten-1">
      <!--  -->
      
        <v-container fluid>
         
          <v-row justify="center" align="center">
            <v-col cols="12" sm="6">
              <v-sheet
                rounded="xl"
                min-height="291"
                color=""
                :elevation="15"
              >
                <div align="center">
                  <v-row justify="center" align="center">
                    <v-col cols="10" sm="6" class="mt-5">
                      <h1 class="text-center primary--text">Login</h1>
                      <body class="mt-10 black--text">
                        Login to your business account.
                      </body>

                      <v-dialog
                        v-model="dialog"
                        persistent
                        max-width="600px"
                        min-width="360px"
                        @click:outside="dialog = false"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="blue darken-3"
                            rounded
                            class="mt-10 white--text"
                            v-bind="attrs"
                            v-on="on"
                          >
                            Login
                          </v-btn>
                        </template>

                        <v-card>
                          <v-tabs
                            background-color="black"
                            icons-and-text
                            dark
                            grow
                          >
                            <v-tabs-slider
                              color="purple darken-4"
                            ></v-tabs-slider>
                            <v-tab>
                              <div class="caption py-1">Login</div>
                              <v-icon large>mdi-account</v-icon>
                            </v-tab>

                            <v-tab-item>
                              <v-card class="px-4">
                                <v-card-text>
                                  <v-form
                                    ref="loginForm"
                                    v-model="valid"
                                    lazy-validation
                                    @submit.prevent="login_pressed"
                                  >
                                    <v-row>
                                      <v-col cols="12">
                                        <v-text-field
                                          v-model="loginEmail"
                                          :rules="loginEmailRules"
                                          label="E-mail"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12">
                                        <v-text-field
                                          v-model="loginPassword"
                                          :append-icon="
                                            show2 ? 'eye' : 'eye-off'
                                          "
                                          :rules="[rules.required, rules.min]"
                                          :type="show2 ? 'text' : 'password'"
                                          name="input-10-1"
                                          label="Password"
                                          hint="At least 8 characters"
                                          counter
                                          @click:append="show2 = !show2"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col
                                        class="d-flex mt-3"
                                        cols="12"
                                        sm="6"
                                        xsm="12"
                                      >
                                        <a @click="forgot_password">
                                          Forgot Password?
                                        </a>
                                      </v-col>

                                      <v-spacer></v-spacer>
                                      <v-col
                                        class="d-flex"
                                        cols="12"
                                        sm="3"
                                        xsm="12"
                                        align-end
                                      >
                                        <v-btn
                                          x-large
                                          block
                                          :disabled="!valid"
                                          color="indigo accent-3"
                                          class="white--text"
                                          @click="login"
                                        >
                                          Login
                                        </v-btn>
                                      </v-col>
                                    </v-row>
                                  </v-form>
                                </v-card-text>
                              </v-card>
                            </v-tab-item>
                          </v-tabs>
                        </v-card>
                      </v-dialog>
                    </v-col>

                    <v-col cols="10" sm="6" class="mt-5">
                      <h1 class="text-center orange--text">Register</h1>
                      <body class="mt-10 black--text">
                        Create your business account.
                      </body>

                      <v-dialog
                        v-model="dialog_register"
                        persistent
                        max-width="600px"
                        min-width="360px"
                        @click:outside="dialog_register = false"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="orange darken-3"
                            rounded
                            class="mt-10 white--text"
                            v-bind="attrs"
                            v-on="on"
                          >
                            Register
                          </v-btn>
                        </template>

                        <v-card>
                          <v-tabs
                            show-arrows
                            background-color="black"
                            icons-and-text
                            dark
                            grow
                          >
                            <v-tabs-slider
                              color="purple darken-4"
                            ></v-tabs-slider>
                            <v-tab>
                              <div class="caption py-1">Register</div>
                              <v-icon large>mdi-account-outline</v-icon>
                            </v-tab>

                            <v-tab-item>
                              <v-card class="px-4">
                                <v-card-text>
                                  <v-form
                                    ref="registerForm"
                                    v-model="valid_register"
                                    lazy-validation
                                    @submit.prevent="register_pressed"
                                  >
                                    <v-row>
                                      <v-col cols="12" sm="12" md="12">
                                        <v-text-field
                                          v-model="businessName"
                                          :rules="businessNameRules"
                                          label="Business Name"
                                          maxlength="30"
                                          required
                                        ></v-text-field>
                                      </v-col>

                                      <v-col cols="12">
                                        <v-text-field
                                          v-model="email"
                                          :rules="emailRules"
                                          label="E-mail"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12">
                                        <v-text-field
                                          v-model="password"
                                          :append-icon="
                                            show1 ? 'mdi-eye' : 'mdi-eye-off'
                                          "
                                          :rules="[rules.required, rules.min]"
                                          :type="show1 ? 'text' : 'password'"
                                          name="input-10-1"
                                          label="Password"
                                          hint="At least 8 characters"
                                          counter
                                          @click:append="show1 = !show1"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12">
                                        <v-text-field
                                          block
                                          v-model="verify"
                                          :append-icon="
                                            show1 ? 'mdi-eye' : 'mdi-eye-off'
                                          "
                                          :rules="[
                                            rules.required,
                                            passwordMatch,
                                          ]"
                                          :type="show1 ? 'text' : 'password'"
                                          name="input-10-1"
                                          label="Confirm Password"
                                          counter
                                          @click:append="show1 = !show1"
                                        ></v-text-field>
                                      </v-col>
                                      <v-spacer></v-spacer>
                                      <v-col
                                        class="d-flex ml-auto"
                                        cols="12"
                                        sm="3"
                                        xsm="12"
                                      >
                                        <v-btn
                                          x-large
                                          block
                                          :disabled="!valid_register"
                                          color="brown darken-2"
                                          class="white--text"
                                          @click="register"
                                          >Register</v-btn
                                        >
                                      </v-col>
                                    </v-row>
                                  </v-form>
                                </v-card-text>
                              </v-card>
                            </v-tab-item>
                          </v-tabs>
                        </v-card>
                      </v-dialog>
                    </v-col>
                  </v-row>
                </div>
              </v-sheet>
            </v-col>
          </v-row>

        </v-container>

        <v-container class="pa-5">
          <v-row>
            <v-col cols="12" sm="12">
              <v-sheet
                min-height="32vh"
                rounded="lg"
                color="black"
                class="pa-4"
                dark
              >
                <v-row justify="center" align="center" class="pa-2">
                  <v-col>
                    <span>
                      <h1>Hello !! 😀</h1>
                      <h2>Welcome to Crispicy.</h2>
                      <body>
                        Are you a restaurant owner? Or, a merchant, tired of
                        documenting your records of sales, inventory, etc. on
                        physical paper and looking to digitalize your business.
                        We provide every service you need to get your business
                        online at very less price. And many exciting features to
                        help you grow your business. Access your business record
                        anywhere, anytime and from any device with
                        <strong>Crispicy</strong>.
                      </body>
                    </span>
                  </v-col>

                  <v-col>
                    <span>
                      <v-img
                        lazy-src="https://media.istockphoto.com/vectors/document-icon-on-black-background-black-flat-style-vector-vector-id1161114277?k=20&m=1161114277&s=170667a&w=0&h=R_1F1FHPftuEaJdOXh8nMoXaliii6WtVbO61kJQlOgM="
                        max-height="350"
                        max-width="auto"
                        class="rounded float-right"
                        src="https://media.istockphoto.com/vectors/document-icon-on-black-background-black-flat-style-vector-vector-id1161114277?k=20&m=1161114277&s=170667a&w=0&h=R_1F1FHPftuEaJdOXh8nMoXaliii6WtVbO61kJQlOgM="
                      ></v-img>
                    </span>
                  </v-col>
                </v-row>

                <!--  -->
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>

        <v-container>
          <div class="pa-7 col-md-6 col-sm-12 mx-auto">
            <h1 class="text-center">Frequently Asked Questions</h1>

            <v-row class="pa-7">
              <v-expansion-panels inset focusable>
                <v-expansion-panel>
                  <v-expansion-panel-header
                    color="grey darken-2"
                    class="white--text font-weight-bold"
                    >How this technology is useful for
                    merchant?</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    This technology is developed to assist the merchant in
                    managing their business. This is a management system that
                    will help the merchant to keep track of their sales,
                    inventory, and other business related information. This
                    system will also help the merchant to manage their business
                    in a more efficient way. Keep all the record (sales,
                    inventory, etc.) of your business in one place and manage it
                    online with ease.
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header
                    color="grey darken-2"
                    class="white--text font-weight-bold"
                    >Do we require to take subscription or is it
                    free?</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    This management system platform strictly requires
                    subscription. This is because this system is developed by a
                    team of developers and we have to pay for the technology
                    which we are using to serve our customers like servers,
                    domains, databases etc. However, we provide limited free
                    trial period for our customers on special requests from
                    their side, so that they can try out our system and see if
                    it is suitable for them.
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header
                    color="grey darken-2"
                    class="white--text font-weight-bold"
                    >Who can take advantage of this type of management
                    system?</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    A merchant who wants to manage their sales, inventory, and
                    other business related information online. If you want to
                    keep transactional records, sales, inventory, etc. of your
                    business in one place, then this is the technology that you
                    need. We provide all sorts of features to make your business
                    management easier, and many more features are coming soon.
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
          </div>
        </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase";
import "firebase/auth";
import { db } from "../main";
// import { sendEmailVerification } from 'firebase/auth';

// particle animation for background
import Vue from "vue";
import VueParticles from "vue-particles";
Vue.use(VueParticles);

export default {
  name: "Home",

  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    },
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },

    // login function
    async login() {
      this.dialog = false;

      if (this.loginEmail == "" || this.loginPassword == "") {
        alert("Please fill all the fields");
      }

      firebase
        .auth()
        .signInWithEmailAndPassword(this.loginEmail, this.loginPassword)
        .then(
          (user) => {
            if (user.user.emailVerified === true) {
              this.$router.push("/dashboard");
            } else {
              alert("Please verify your email address");
            }
          },

          (err) => {
            alert(err.message);
          }
        );
    },

    // register function
    async register() {
      if (this.$refs.registerForm.validate()) {
        this.dialog_register = false;

        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(
            (user) => {
              db.collection("profile").doc(user.user.uid).set({
                businessName: this.businessName,
              });

              user.user.sendEmailVerification();
              alert("Please verify your email address");
            },
            (error) => {
              alert(error.message);
            }
          );
      }
    },

    async forgot_password() {
      if (this.loginEmail == "") {
        alert(
          "Please type email address and then click on the 'forgot password' button"
        );
      } else {
        this.dialog = false;

        firebase
          .auth()
          .sendPasswordResetEmail(this.loginEmail)
          .then(
            () => {
              alert("Password reset email sent");
            },
            (error) => {
              alert("Email is not registered.  " + error.message);
            }
          );
      }
    },
  },

  data: () => ({
    dialog: false,
    dialog_register: false,

    valid: true,
    valid_register: true,

    businessName: "",
    businessNameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 30) || "Name must be less than 30 characters",
      (v) => /^[a-zA-Z ]+$/.test(v) || "Name must be alphabet only",
      // condition for only alphabetical characters
      // v => /^[a-zA-Z]+$/.test(v) || 'First Name must be alphabetical'
    ],

    password: "",
    verify: "",
    loginPassword: "",
    loginEmail: "",
    loginEmailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],

    email: "",
    emailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],

    show1: false,
    show2: false,

    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => (v && v.length >= 8) || "Min 8 characters",
    },
  }),
};
</script>
