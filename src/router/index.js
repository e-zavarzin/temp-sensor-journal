import Vue from 'vue'
import VueRouter from 'vue-router'
import EntriesList from '../views/EntriesList.vue'
import EntryForm from '../views/EntryForm.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Root',
    redirect: {
      name: 'EntriesList',
    },
  },
  {
    path: '/list',
    name: 'EntriesList',
    component: EntriesList
  },
  {
    path: '/item',
    name: 'EntryForm',
    component: EntryForm
  },
  {
    path: '/item/:id',
    name: 'EntryForm',
    component: EntryForm
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
