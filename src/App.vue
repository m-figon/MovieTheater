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
  background: #000000;
}
a{
  text-decoration: none;
}
#app {
  margin: 0;
  font-family: "Lato", sans-serif;
  color: white;
  height: calc(100vh);
}
</style>
