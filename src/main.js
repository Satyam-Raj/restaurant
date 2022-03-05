import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
// import axios from 'axios'
// import firebase from 'firebase/app'


// Vue.prototype.$axios = axios
// Vue.config.productionTip = false


// firebase configuration

// const firebaseConfig = {
//   apiKey: "AIzaSyALgjOUTpUbl-CegOPOUyUMu4fzUpRpCJ0",
//   authDomain: "inventory-project-236d0.firebaseapp.com",
//   projectId: "inventory-project-236d0",
//   storageBucket: "inventory-project-236d0.appspot.com",
//   messagingSenderId: "505556410802",
//   appId: "1:505556410802:web:eacff303e256384b5d84ab",
//   measurementId: "G-NWLE38MNER"
// };

// firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
