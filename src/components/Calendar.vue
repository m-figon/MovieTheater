<template>
  <div class="calendar">
        <button v-on:click="subtractDay()" id="left-arrow"></button>
        <h1>{{date}}</h1>
        <button v-on:click="addDay()" id="right-arrow"></button>
      </div>
</template>

<script>
import moment from "moment";

export default {
    props: ['date'],
  data() {
    return {
      calendarDate: null
    };
  },
  methods:{
      addDay() {
      this.calendarDate = moment(this.date, "ll").add(1, "d");
      this.calendarDate = moment(this.calendarDate).format("ll");
      this.$emit('changeDate',this.calendarDate);
    },
    subtractDay() {
      this.calendarDate = moment(this.date, "ll").subtract(1, "d");
      this.calendarDate = moment(this.calendarDate).format("ll");
      this.$emit('changeDate',this.calendarDate);
    }
  }
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="../style.css">

</style>