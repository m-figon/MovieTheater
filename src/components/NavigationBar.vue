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

        <router-link to="/cinemas">
          <h1>Our Cinemas</h1>
        </router-link>

        <router-link to="/login">
          <h1>Sign in</h1>
        </router-link>

        <router-link to="/register">
          <h1>Sign up</h1>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
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
}
.nav-bar-display {
  width: 60%;
  height: 100%;
  display: flex;
  color: white;
}
.left {
  display: flex;
  align-items: center;
  width: 20%;
  justify-content: center;
}
.left h2 {
  font-size: 1.5rem;
  color: #c8006d;
}
.right {
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.right h1 {
  font-size: 1.2rem;
  margin: 0 1rem;
  color: white;
}
</style>
