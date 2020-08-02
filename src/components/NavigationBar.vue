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
<style scoped>
.nav-bar {
  width: 100vw;
  height: 5rem;
  display: flex;
  justify-content: center;
  background: #000000;
  border-bottom: 1px solid gray;
}
.nav-bar-display {
  width: 60%;
  height: 100%;
  display: flex;
  color: white;
}
.nav-bar-display .left {
  display: flex;
  align-items: center;
  width: 20%;
  justify-content: center;
}
.nav-bar-display .left h2 {
  font-size: 1.5rem;
  color: #c8006d;
}
.nav-bar-display .right {
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav-bar-display .right h1 {
  font-size: 1.2rem;
  margin: 0 1rem;
  color: gray;
}
.nav-bar-display .right h1:hover {
  color: #c8006d;
}
.nav-bar-display .right h1:hover {
  cursor: pointer;
}
@media only screen and (max-width: 1300px) {
  .nav-bar-display {
  width: 80%;
}
}
@media only screen and (max-width: 1000px) {
  .nav-bar-display .left h2 {
  font-size: 1.2rem;
}
.nav-bar-display .right h1 {
  font-size: 1.0rem;
  margin: 0 0.5rem;
}
}
@media only screen and (max-width: 750px) {
 .nav-bar-display .left {
  width: 30%;
}
.nav-bar-display .right {
  width: 70%;
}
}
@media only screen and (max-width: 560px) {
   .nav-bar-display .left {
  width: 25%;
}
.nav-bar-display .right {
  width: 75%;
}
.nav-bar-display {
  width: 97%;
}
  .nav-bar-display .left h2 {
  font-size: 0.8rem;
}
.nav-bar-display .right h1 {
  font-size: 0.7rem;
  margin: 0 0.2rem;
}
}
</style>
