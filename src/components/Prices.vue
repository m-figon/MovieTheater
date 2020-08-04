<template>
  <div class="prices">
    <div class="prices-display">
      <h2>Prices</h2>
      <div class="row">
        <div class="left">
          <h2>2D Movies</h2>
          <ul>
            <li>Adults - 9.30$</li>
            <li>Students - 7.44$</li>
            <li>Children - 4.65$</li>
          </ul>
        </div>
        <div class="right">
          <h2>3D Movies</h2>
          <ul>
            <li>Adults - 10.00$</li>
            <li>Students - 8.00$</li>
            <li>Children - 5.00$</li>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="!loaded" class="loading">
      <img src="../assets/loading.gif" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loaded: false
    };
  },
  mounted(){
    this.loaded=true;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="../style.css">

</style>