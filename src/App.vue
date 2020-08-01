<template>
  <div id="app">
    <nav-bar />
    <login v-if="login" />
    <register v-if="register" />
    <router-view />
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar";
import Login from "./components/Login";
import Register from "./components/Register";
import store from "./store/index";

export default {
  store,
  name: "App",
  components: {
    "nav-bar": NavigationBar,
    login: Login,
    register: Register,
  },
  data() {
    return {
      login: false,
      register: false,
    };
  },
  created(){
    setInterval(() => {
          this.login = this.$store.state.login;
          this.register = this.$store.state.register;
        }, 500);
  }
};
</script>

<style>
body {
  margin: 0;
  background: #000000;
}
a {
  text-decoration: none;
}
#app {
  margin: 0;
  font-family: "Lato", sans-serif;
  color: white;
  height: calc(100vh);
}
</style>
