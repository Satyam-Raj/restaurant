import Vue from 'vue'
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
    component: Dashboard
  },
  {
    path: '/inventory',
    name: 'Inventory',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Inventory
  },
  {
    path: '/sales',
    name: 'Sales',
    component: Sales
  },
  {
    path: '/buffer',
    name: 'Buffer',
    component: Buffer
  },
  {
    path: '/payments',
    name: 'Payments',
    component: Payments
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/premium',
    name: 'Premium',
    component: Premium
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
