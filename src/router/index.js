import Vue from 'vue'
import VueRouter from 'vue-router'
import EntriesList from '../views/EntriesList.vue'
import EntryForm from '../views/EntryForm.vue'
import FormMode from '@/types/FormMode';

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

// this fixes the bug with button tooltip that remains after changing layout
router.afterEach(() => {
  const Stickedtooltips = document.querySelectorAll(".vs-tooltip");
  for (const tooltip of Stickedtooltips) {
    tooltip.remove();
  }
});

export default router
