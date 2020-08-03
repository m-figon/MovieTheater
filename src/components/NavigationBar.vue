<template>
  <div class="nav-bar">
    <div class="nav-bar-display">
      <div class="left">
        <router-link to="/">
          <h2>Movie Theater</h2>
        </router-link>
      </div>
      <div class="right">
        <router-link to="/repertoire">
          <h1>Repertoire</h1>
        </router-link>

        <router-link to="/prices">
          <h1>Price List</h1>
        </router-link>
        <div v-if="logedAc===''">
          <h1 v-on:click="login()">Sign in</h1>
        </div>
        <div v-else>
          <h1 v-on:click="signOut()">Sign out</h1>
        </div>
        <h1 v-on:click="register()">Sign up</h1>
        <router-link to="/orders">
          <h1>{{logedAc}}</h1>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store/index";

export default {
  store,
  data() {
    return {
      logedAc: "",
    };
  },
  created() {
    setInterval(() => {
      this.logedAc = this.$store.state.user.logedUser;
    }, 500);
  },
  methods: {
    signOut() {
      this.$store.commit("changeName", "");
    },
    login() {
      this.$store.commit("changeLogin", true);
      this.$store.commit("changeRegister", false);
    },
    register() {
      this.$store.commit("changeRegister", true);
      this.$store.commit("changeLogin", false);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="../style.css">

</style>
