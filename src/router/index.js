import Vue from 'vue'
import VueRouter from 'vue-router'
import EntriesView from '../views/EntriesView.vue'
import EntryForm from '../views/EntryForm.vue'
import FormMode from '@/types/FormMode';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Root',
    redirect: {
      name: 'EntriesView',
    },
  },
  {
    path: '/list',
    name: 'EntriesView',
    component: EntriesView
  },
  {
    path: '/item',
    name: 'EntryFormNew',
    component: EntryForm,
    props: () => ({
      mode: FormMode.NEW,
    }),
  },
  {
    path: '/item/:id',
    name: 'EntryFormEdit',
    component: EntryForm,
    props: (route) => ({
      mode: FormMode.EDIT,
      id: route.params.id,
    }),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
