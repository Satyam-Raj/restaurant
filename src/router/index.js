import Vue from 'vue'
import firebase from 'firebase'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Inventory from '../views/Inventory.vue'
import Sales from '../views/Sales.vue'
import Buffer from '../views/Buffer.vue'
import Payments from '../views/Payments.vue'
import Account from '../views/Account.vue'
import Premium from '../views/Premium.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import Employee from '../views/Employee.vue'





Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/inventory',
    name: 'Inventory',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Inventory,
    meta: { requiresAuth: true }
  },
  {
    path: '/sales',
    name: 'Sales',
    component: Sales,
    meta: { requiresAuth: true }
  },
  {
    path: '/buffer',
    name: 'Buffer',
    component: Buffer,
    meta: { requiresAuth: true }
  },
  {
    path: '/payments',
    name: 'Payments',
    component: Payments,
    meta: { requiresAuth: true }
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    meta: { requiresAuth: true }
  },
  {
    path: '/premium',
    name: 'Premium',
    component: Premium,
    meta: { requiresAuth: true }
  },
  {
    path: '/employee',
    name: 'Employee',
    component: Employee,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  if (requiresAuth && !isAuthenticated) {
    next('/')
  } else {
    next()
  }

})


export default router
