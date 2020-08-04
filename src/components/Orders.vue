<template>
  <div>
    <div v-if="logedAc" class="orders">
      <h2>{{user.account}}'s orders</h2>
      <div class="films">
        <div v-for="item in user.orders" class="film">
          <div class="left">
            <img v-bind:src="item.img" />
          </div>
          <div class="middle">
            <div class="big-line">
              <div class="line">
                <h2>{{item.title}}</h2>
              </div>
              <div class="line" id="gray">
                <h1>{{item.type}}</h1>
                <div class="separator"></div>
                <h1>Above {{item.age}}</h1>
                <div class="separator"></div>
                <h1>{{item.duration}}</h1>
              </div>
            </div>
            <h1>City: {{item.city}}</h1>
            <h1>Date: {{item.date}}</h1>
            <h1>Hour: {{item.hour}}</h1>
            <h1>Type: {{item.type}}</h1>
            <h1>Price: {{item.price}}$</h1>

            <div class="line">
              <h1>Seats:</h1>
              <h1 id="seat" v-for="seat in item.seats">{{seat}}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!logedAc" class="orders">
      <h2>You are not logged</h2>
    </div>
  </div>
</template>

<script>
import store from "../store/index";

export default {
  store,
  data() {
    return {
      user: null,
      logedAc: "",
    };
  },
  methods: {},
  created() {
    fetch("https://rocky-citadel-32862.herokuapp.com/MovieTheater/users")
      .then((response) => response.json())
      .then((data) => {
        this.logedAc = this.$store.state.user.logedUser;
        let users;
        users = data.slice();
        for (let item of users) {
          if (item.account === this.logedAc) {
            this.user = item;
          }
        }
      });
    setInterval(() => {
      this.logedAc = this.$store.state.user.logedUser;
    }, 500);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Orders.css">

</style>