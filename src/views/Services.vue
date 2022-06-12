<template>
    
  <v-app id="about">
    <v-app-bar
      app
      color="grey darken-4"
      flat
    >

    
   

      <v-tabs
        centered
        color="white"
        dark
      >
        <v-tab router to="/" >
          Home
        </v-tab>

        <v-tab router to="/services" >
            Services
        </v-tab>

        <v-tab router to="/contact" >
            Contact Us
        </v-tab>


      </v-tabs>

      <!-- login and register button below -->



    </v-app-bar>


    <v-main class="pa-16">
        

        <!--  -->
          <v-sheet
             min-height="80vh"
             min-width="50%"
             rounded="lg" 
             :elevation="10" 
             dark
             class="pa-3"
             >

             <h1 align="center" class="orange--text text-decoration-underline">Crispicy</h1>
            <body class="pt-3" align="center">
              
              <v-row justify="center">
                <v-col sm="4" cols="12">
                  <v-card color="white">
                    <v-card-text>
                      <span>
                        <h2 class="primary--text">
                          Sales &nbsp;&nbsp;&nbsp;<v-icon color="red" large>mdi-food-fork-drink</v-icon>
                        </h2>
                        <body class="black--text" >
                          <p>
                            Crispicy's "<b>Sales</b>" system is a simple and easy to use system that allows you to keep record and manage your restaurant's sales. And it gives you all the data visualizations you need to make your restaurant's sales more efficient. Graph of the sales lets you see how your restaurant's sales are doing over time and compare the graph of different days of a month to monitor sales. We recommend you to use this system to keep track of your restaurant's sales and focus on increasing your <b>income</b>.
                          </p>
                        </body>
                      </span>
                      
                    </v-card-text>
                  </v-card>
                </v-col>
                
                <v-col sm="4" cols="12">
                  <v-card color="white">
                    <v-card-text>
                      <span>
                        <h2 class="black--text">
                          Inventory &nbsp;&nbsp;&nbsp;<v-icon color="orange" large>mdi-truck-fast</v-icon>
                        </h2>
                        <body class="black--text" >
                          <p>
                            Our "<b>Inventory</b>" system is would be best companion for your restaurant, as it allows you to keep all records of your inventory and manage it. You can also see the graph of your inventory on dashboard page and compare it with the sales of a month, which will give brief description of your loss or profit. One important aspect of inventory system is that you can also keep track of your product's quantity and calculate the profit or loss of your inventory.
                          </p>
                        </body>
                      </span>
                      
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-col sm="4" cols="12">
                  <v-card color="white">
                    <v-card-text>
                      <span>
                        <h2 class="green--text">
                          Buffer &nbsp;&nbsp;&nbsp;<v-icon color="purple" large>mdi-basket-fill</v-icon>
                        </h2>
                        <body class="black--text" >
                          <p>
                            We also have a "<b>Buffer</b>" system, here you can plan your future product purchase. No need to remember the product and exact quantity of the product you want to purchase. You can simply enter the product name and quantity and access it at time of purchase or re-stocking of your inventory. It is as good as a diary, you can keep record of your future product purchase and plan your future re-stocking.
                          </p>
                        </body>
                      </span>
                      
                    </v-card-text>
                  </v-card>
                </v-col>
                
                <v-col sm="4" cols="12">
                  <v-card color="white">
                    <v-card-text>
                      <span>
                        <h2 class="pink--text">
                          Payment &nbsp;&nbsp;&nbsp;<v-icon color="primary" large>mdi-currency-inr</v-icon>
                        </h2>
                        <body class="black--text" >
                          <p>
                            "<b>Payment</b>" system is a unique way to find out restaurant's past payment and filter it on the basis of payment method. Suppose you accept several payment methods and you want to know the total dues payable, you can just get all the data by using the filter system in Payment section.
                          </p>
                        </body>
                      </span>
                      
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>


              <v-row justify="center">
                <v-col sm="4" cols="12">
                  <v-card color="white">
                    <v-card-text>
                      <span>
                        <h2 class="orange--text">
                          Dashboard &nbsp;&nbsp;&nbsp;<v-icon color="black" large>mdi-view-dashboard</v-icon>
                        </h2>
                        <body class="black--text" >
                          <p>
                            As "<b>Dashboard</b>" word suggest, this is the main page of the system. It shows you the total sales and total inventory, and most importantly profit and loss of your company. You can also see the graph of your sales and inventory based on today or a month, and you can choose date range to see the graph of selected date range in any month.
                          </p>
                        </body>
                      </span>
                      
                    </v-card-text>
                  </v-card>
                </v-col>
                
                <v-col sm="4" cols="12">
                  <v-card color="white">
                    <v-card-text>
                      <span>
                        <h2 class="purple--text">
                          Employee Management &nbsp;&nbsp;&nbsp;<v-icon color="green" large>mdi-account-multiple</v-icon>
                        </h2>
                        <body class="black--text" >
                          Every restaurant/company has employee which they need to manage and pay every month. We got your back with our "<b>Employee Management</b>" system. You can keep record of your employees and you can also add, edit and delete using this system. This can become handy when you need to manage your employees and pay them. You can manage you employees data month wise.
                        </body>
                      </span>
                      
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>


            </body>
          </v-sheet>

      
    </v-main>

  </v-app>
</template>

