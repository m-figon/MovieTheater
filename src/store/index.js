// store/index.js
 
import Vue from "vue";
import Vuex from "vuex";
 
Vue.use(Vuex);
 
export default new Vuex.Store({
 state: {
      user: {
        logedUser: ''
      }
 },
 getters: {
    getUser: state => {
        return state.user.logedUser;
      }
 },
 mutations: {
    changeName (state, payload) {
        state.user.logedUser = payload
      }
 },
 actions: {}
});