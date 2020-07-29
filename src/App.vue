<template>
  <div id="app">
    <nav-bar />
    <router-view />
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar";
export default {
  name: "App",
  components: {
    "nav-bar": NavigationBar,
  },
};
</script>

<style>
body {
  margin: 0;
}
a{
  text-decoration: none;
}
#app {
  margin: 0;
  font-family: "Lato", sans-serif;
  color: white;
  background: #232526; /* fallback for old browsers */
  height: calc(100vh);
  background: -webkit-linear-gradient(
    to right,
    #414345,
    #232526
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #414345,
    #232526
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
