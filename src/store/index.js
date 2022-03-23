import Vue from 'vue'
import Vuex from 'vuex'
import entriesTableState from './modules/entriesTableState';
import entriesChecked from './modules/entriesChecked';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    entriesTableState,
    entriesChecked
  }
})
