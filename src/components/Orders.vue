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
<style scoped>
a {
  text-decoration: none;
  color: #c8006d;
}
.orders {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
}
.orders h1 {
  font-size: 1.2rem;
}
.orders h2 {
  font-size: 1.7rem;
}
.films {
  width: 30%;
  display: flex;
  flex-direction: column;
}
.film {
  height: 20rem;
  width: 100%;
  border-bottom: 1px solid gray;
  display: flex;
}
.film h1 {
  font-size: 1rem;
}
.film h2 {
  font-size: 1.5rem;
  text-transform: uppercase;
  margin-top: 2rem;
}
.separator {
  background: white;
  width: 1px;
  height: 1rem;
  margin: 0 0.5rem;
  color: gray;
}
#seat {
  margin: 0 0.3rem;
}
.left {
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.middle {
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin: 0 3%;
}
.big-line {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.p-line {
  height: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
}
.line {
  display: flex;
  align-items: center;
  width: 100%;
}
.right {
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}
.left img {
  width: 10rem;
  height: 14rem;
  -webkit-box-shadow: 0px 0px 29px -23px rgba(255, 255, 255, 1);
  -moz-box-shadow: 0px 0px 29px -23px rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 29px -23px rgba(255, 255, 255, 1);
}
#pink {
  color: #c8006d;
}
#centered {
  justify-content: center;
}
#gray {
  color: gray;
}
</style>
