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
                            >{{ item.fullName }}</v-expansion-panel-header
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

                                  <v-dialog
                                    v-model="dialog"
                                    persistent
                                    max-width="790"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-btn
                                        color="primary"
                                        dark
                                        v-bind="attrs"
                                        v-on="on"
                                        large
                                        outlined
                                        @click="editEmployee(item.id)"
                                      >
                                        <v-icon>mdi-pencil</v-icon>
                                      </v-btn>
                                    </template>
                                    <v-card>
                                      <v-container
                                        class="text-center primary white--text"
                                      >
                                        <h2>{{ item.fullName }}</h2>
                                      </v-container>

                                      <v-container>
                                        <v-col col="12" sm="12">
                                          <v-row>
                                            <v-col col="12" sm="3">
                                              <v-text-field
                                                v-model="edit.January"
                                                value="January"
                                                outlined
                                                filled
                                                dense
                                              ></v-text-field>
                                            </v-col>

                                            <v-col col="12" sm="9">
                                              <v-textarea
                                                v-model="edit.janDescription"
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
                                                v-model="edit.February"
                                                value="February"
                                                outlined
                                                filled
                                                dense
                                              ></v-text-field>
                                            </v-col>

                                            <v-col col="12" sm="9">
                                              <v-textarea
                                                v-model="edit.febDescription"
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
                                                v-model="edit.March"
                                                value="March"
                                                outlined
                                                filled
                                                dense
                                              ></v-text-field>
                                            </v-col>

                                            <v-col col="12" sm="9">
                                              <v-textarea
                                                v-model="edit.marDescription"
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
                                                v-model="edit.April"
                                                outlined
                                                filled
                                                dense
                                              ></v-text-field>
                                            </v-col>

                                            <v-col col="12" sm="9">
                                              <v-textarea
                                                label="Description"
                                                v-model="edit.aprDescription"
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
                                                v-model="edit.May"
                                                outlined
                                                filled
                                                dense
                                              ></v-text-field>
                                            </v-col>

                                            <v-col col="12" sm="9">
                                              <v-textarea
                                                label="Description"
                                                v-model="edit.mayDescription"
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
                                                v-model="edit.June"
                                                outlined
                                                filled
                                                dense
                                              ></v-text-field>
                                            </v-col>

                                            <v-col col="12" sm="9">
                                              <v-textarea
                                                label="Description"
                                                v-model="edit.junDescription"
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
                                                v-model="edit.July"
                                                outlined
                                                filled
                                                dense
                                              ></v-text-field>
                                            </v-col>

                                            <v-col col="12" sm="9">
                                              <v-textarea
                                                label="Description"
                                                v-model="edit.julDescription"
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
                                                v-model="edit.August"
                                                outlined
                                                filled
                                                dense
                                              ></v-text-field>
                                            </v-col>

                                            <v-col col="12" sm="9">
                                              <v-textarea
                                                label="Description"
                                                v-model="edit.augDescription"
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
                                                v-model="edit.September"
                                                outlined
                                                filled
                                                dense
                                              ></v-text-field>
                                            </v-col>

                                            <v-col col="12" sm="9">
                                              <v-textarea
                                                label="Description"
                                                v-model="edit.sepDescription"
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
                                                v-model="edit.October"
                                                outlined
                                                filled
                                                dense
                                              ></v-text-field>
                                            </v-col>

                                            <v-col col="12" sm="9">
                                              <v-textarea
                                                label="Description"
                                                v-model="edit.octDescription"
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
                                                v-model="edit.November"
                                                outlined
                                                filled
                                                dense
                                              ></v-text-field>
                                            </v-col>

                                            <v-col col="12" sm="9">
                                              <v-textarea
                                                label="Description"
                                                v-model="edit.novDescription"
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
                                                v-model="edit.December"
                                                outlined
                                                filled
                                                dense
                                              ></v-text-field>
                                            </v-col>

                                            <v-col col="12" sm="9">
                                              <v-textarea
                                                label="Description"
                                                v-model="edit.decDescription"
                                                auto-grow
                                                outlined
                                                shaped
                                                rows="1"
                                              ></v-textarea>
                                            </v-col>
                                          </v-row>
                                        </v-col>
                                      </v-container>

                                      <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                          color="primary"
                                          text
                                          outlined
                                          @click="updateEdit"
                                        >
                                          Update
                                        </v-btn>
                                        <v-btn
                                          color="red darken-1"
                                          text
                                          outlined
                                          @click="dialog = false"
                                        >
                                          Cancel
                                        </v-btn>
                                      </v-card-actions>
                                    </v-card>
                                  </v-dialog>

                                  &nbsp;&nbsp;

                                  <v-dialog
                                    v-model="dialog2"
                                    persistent
                                    max-width="290"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-btn
                                        color="red"
                                        dark
                                        v-bind="attrs"
                                        v-on="on"
                                        large
                                        outlined
                                      >
                                        <v-icon>mdi-delete</v-icon>
                                      </v-btn>
                                    </template>
                                    <v-card>
                                      <v-card-title class="text-h7">
                                        Delete Employee {{ item.fullName }}
                                      </v-card-title>
                                      <v-card-text
                                        >Are you sure, you want to
                                        delete?</v-card-text
                                      >
                                      <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                          color="red darken-1"
                                          text
                                          outlined
                                          @click="deleteDBEmployee(item.id)"
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
    dialog: false,
    dialog2: false,

    user: firebase.auth().currentUser,
    profile: {},

    dbEmployeeList: [],

    key: "",
    edit: {
      January: "",
      February: "",
      March: "",
      April: "",
      May: "",
      June: "",
      July: "",
      August: "",
      September: "",
      October: "",
      November: "",
      December: "",

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
    },

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

    editEmployee(id) {
      // fetch data from firebase of the employee with id
      db.collection("users")
        .doc(this.user.uid)
        .collection("employeeList")
        .doc(id)
        .get()
        .then((doc) => {
          this.edit.January = doc.data().January;
          this.edit.February = doc.data().February;
          this.edit.March = doc.data().March;
          this.edit.April = doc.data().April;
          this.edit.May = doc.data().May;
          this.edit.June = doc.data().June;
          this.edit.July = doc.data().July;
          this.edit.August = doc.data().August;
          this.edit.September = doc.data().September;
          this.edit.October = doc.data().October;
          this.edit.November = doc.data().November;
          this.edit.December = doc.data().December;

          this.edit.janDescription = doc.data().janDescription;
          this.edit.febDescription = doc.data().febDescription;
          this.edit.marDescription = doc.data().marDescription;
          this.edit.aprDescription = doc.data().aprDescription;
          this.edit.mayDescription = doc.data().mayDescription;
          this.edit.junDescription = doc.data().junDescription;
          this.edit.julDescription = doc.data().julDescription;
          this.edit.augDescription = doc.data().augDescription;
          this.edit.sepDescription = doc.data().sepDescription;
          this.edit.octDescription = doc.data().octDescription;
          this.edit.novDescription = doc.data().novDescription;
          this.edit.decDescription = doc.data().decDescription;

          this.key = id;
        });
    },

    updateEdit() {
      this.dialog = false;
      db.collection("users")
        .doc(this.user.uid)
        .collection("employeeList")
        .doc(this.key)
        .update({
          January: this.edit.January,
          February: this.edit.February,
          March: this.edit.March,
          April: this.edit.April,
          May: this.edit.May,
          June: this.edit.June,
          July: this.edit.July,
          August: this.edit.August,
          September: this.edit.September,
          October: this.edit.October,
          November: this.edit.November,
          December: this.edit.December,

          janDescription: this.edit.janDescription,
          febDescription: this.edit.febDescription,
          marDescription: this.edit.marDescription,
          aprDescription: this.edit.aprDescription,
          mayDescription: this.edit.mayDescription,
          junDescription: this.edit.junDescription,
          julDescription: this.edit.julDescription,
          augDescription: this.edit.augDescription,
          sepDescription: this.edit.sepDescription,
          octDescription: this.edit.octDescription,
          novDescription: this.edit.novDescription,
          decDescription: this.edit.decDescription,
        });
    },

    deleteDBEmployee(id) {
      this.dialog2 = false;
      db.collection("users")
        .doc(this.user.uid)
        .collection("employeeList")
        .doc(id)
        .delete();
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

      // remove all items from the array
      this.employeeList = [];
    },
  },

  created() {
    db.collection("users")
      .doc(this.user.uid)
      .collection("employeeList")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.key = doc.id;
        });
      });
  },

  computed: {},

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

