<template>
<div v-if="rows">
  <div class="row" v-for="(row,index) in rows">
    <div v-for="(seat,key) in row">
      <div v-if="seat==='0'">
        <button v-on:click="green(index,key)" id="green"></button>
      </div>
      <div v-if="seat==='-'">
        <button v-on:click="white(index,key)" id="white-bg"></button>
      </div>
      <div v-if="seat==='1'">
        <button v-on:click="chooseRed()" id="red"></button>
      </div>
      <div v-if="seat!=='0' && seat!=='1' && seat!=='-'">
        <p>{{seat}}</p>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  props: ["rows"],
  data() {
    return {
    };
  },
  methods: {
    green(index,key) {
        let obj={
            id1: index,
            id2: key
        }
      this.$emit("chooseGreen", obj);
    },
    white(index,key) {
        let obj={
            id1: index,
            id2: key
        }
      this.$emit("chooseWhite", obj);
    },
    chooseRed() {
      alert("this place is unavailable");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="../style.css">
</style>