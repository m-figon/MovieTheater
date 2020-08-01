<template>
  <div>
    <div
      class="details"
      v-if="film && logedAc!==''"
      v-bind:style="[film ? {'background': 'url(' + film.img + ') center no-repeat'} : {'background': '#FFF'}]"
    >
      <div class="details-black">
        <div class="details-display">
          <h2>{{film.title.toUpperCase()}}</h2>
          <div class="big-line">
            <div class="city-div">
              <select v-model="city">
                <option value="City">Choose city</option>
                <option v-for="city in cities" v-bind:value="city">{{city}}</option>
              </select>
            </div>
          </div>
          <div class="hour-line" v-if="city!='City'">
            <div v-for="cities in film.cities">
              <div class="line" v-if="cities.name===city">
                <div v-for="(hour,key) in cities.hours">
                  <div
                    v-on:click="chooseHour($event,hour.seats,key)"
                    ref="divs"
                    v:bind:id="hourValue===hour.hour ? pink-bg : black-bg"
                    v-bind:style="[hourValue===hour.hour ? {'background': '#c8006d'} : {'background': 'black'}]"
                    class="hour"
                  >
                    <h1>{{hour.hour}}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="seats" v-if="rows">
            <div class="row" v-for="(row,index) in rows">
              <div v-for="(seat,key) in row">
                <div v-if="seat==='0'">
                  <button v-on:click="chooseGreen(index,key)" id="green"></button>
                </div>
                <div v-if="seat==='-'">
                  <button v-on:click="chooseWhite(index,key)" id="white"></button>
                </div>
                <div v-if="seat==='1'">
                  <button v-on:click="chooseRed()" id="red"></button>
                </div>
                <div v-if="seat!=='0' && seat!=='1' && seat!=='-'">
                  <p>{{seat}}</p>
                </div>
              </div>
            </div>
            <button v-on:click="order()">Order</button>
          </div>
        </div>
      </div>
    </div>
    <div class="details" v-else-if="logedAc===''">
      <div class="details-content">
        <div class="one-line">
          <h1>To buy ticket:</h1>
          <h1 id="pink" v-on:click="login()">sign in</h1>
        </div>
        <div class="one-line">
          <h1>If you haven't created an account:</h1>
          <h1 id="pink" v-on:click="register()">sign up</h1>
        </div>
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
      film: null,
      cities: [],
      city: "City",
      rows: null,
      hourIndex: null,
      filmId: null,
      previousTarget: null,
      logedAc: "",
      params: null,
      hourValue: null,
      users: [],
      seats: [],
    };
  },
  created() {
    fetch("https://rocky-citadel-32862.herokuapp.com/MovieTheater/films")
      .then((response) => response.json())
      .then((data) => {
        let films = [];
        films = data.slice();
        console.log("buy");
        this.filmName = this.$route.path;
        this.filmName = this.filmName.substr(1, this.filmName.length - 5);
        this.filmName = this.filmName.replace("-", " ");
        console.log(this.filmName);
        for (let item of films) {
          if (item.title === this.filmName) {
            this.filmId = item.id;
            this.film = item;
          }
        }
        console.log(this.film);
        console.log(this.film.img);
        for (let item of films) {
          for (let elem of item.cities) {
            console.log(elem.name);
            let existing = false;
            for (let city of this.cities) {
              if (elem.name === city) {
                existing = true;
              }
            }
            if (!existing) {
              this.cities.push(elem.name);
            }
          }
        }
        console.log(this.cities);
        setInterval(() => {
          this.logedAc = this.$store.state.user.logedUser;
        }, 500);
        if (this.$route.query.myprop) {
          this.params = this.$route.query.myprop.split("-");
          console.log(this.params);
          //params[0] - city
          //params[1]- hour
          this.city = this.params[0];
          this.hourValue = this.params[1];
          console.log(this.film.cities);
          for (let item of this.film.cities) {
            if (item.name === this.city) {
              console.log(item.name + "first step!");
              for (let [key, elem] of item.hours.entries()) {
                if (elem.hour === this.hourValue) {
                  this.hourIndex = key;
                  console.log(elem.hour + "second step!");
                  this.rows = elem.seats;
                  this.rows = this.rows.split(",");
                  console.log(this.rows);
                }
              }
            }
          }
        }
      });
    fetch("https://rocky-citadel-32862.herokuapp.com/MovieTheater/users")
      .then((response) => response.json())
      .then((data) => {
        this.users = data.slice();
        console.log(this.users);
      });
  },
  methods: {
    chooseHour(e, str, i) {
      console.log(e.target);
      if (this.previousTarget) {
        this.previousTarget.style.backgroundColor = "black";
      } else {
        console.log("no previous target");
        if (this.$route.query.myprop) {
          console.log(this.$refs.divs);
          for (let item of this.$refs.divs) {
            if (item.style.background === "rgb(200, 0, 109)") {
              item.style.background = "black";
            }
          }
        }
      }
      e.target.style.backgroundColor = "#c8006d";
      this.previousTarget = e.target;
      this.hourIndex = i;
      console.log(this.hourIndex);
      this.rows = str.split(",");
      console.log(this.rows);
    },
    setCharAt(str, index, chr) {
      if (index > str.length - 1) return str;
      return str.substr(0, index) + chr + str.substr(index + 1);
    },
    chooseGreen(id1, id2) {
      let tmp = this.rows.slice();
      tmp[id1] = this.setCharAt(tmp[id1], id2, "-");
      this.rows = tmp.slice();
      console.log(this.rows);
      let second = id2;
      let first;
      switch(id1){
        case 0: first="A"; break;
        case 1: first="B"; break;
        case 2: first="C"; break;
        case 3: first="D"; break;
      }
      this.seats.push(first+""+second);
      console.log(this.seats);
    },
    chooseWhite(id1, id2) {
      let tmp = this.rows.slice();
      tmp[id1] = this.setCharAt(tmp[id1], id2, "0");
      this.rows = tmp.slice();
      console.log(this.rows);
    },
    chooseRed() {
      alert("this place is unavailable");
    },
    order() {
      let tmp = "";
      for (let item of this.rows) {
        tmp += item;
        tmp += ",";
      }
      tmp = tmp.split("-").join("1");
      let cityIndex = null;
      for (let i = 0; i < this.cities.length; i++) {
        if (this.cities[i] === this.city) {
          cityIndex = i;
        }
      }
      console.log(this.film);
      console.log(this.film.cities);
      console.log(this.film.id);
      console.log(cityIndex);
      console.log(this.hourIndex);

      this.film.cities[cityIndex].hours[this.hourIndex].seats = tmp;

      fetch(
        "https://rocky-citadel-32862.herokuapp.com/MovieTheater/films/" +
          this.film.id,
        {
          method: "PUT",
          body: JSON.stringify({
            title: this.film.title,
            duration: this.film.duration,
            img: this.film.img,
            trailer: this.film.trailer,
            description: this.film.description,
            age: this.film.age,
            rating: this.film.rating,
            cities: this.film.cities,
            id: this.film.id,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      ).then(() => {
        let userId;
        let num;
        let ordersValue;
        for (let [index, item] of this.users.entries()) {
          if (item.account === this.logedAc) {
            userId = item.id;
            num = index;
          }
        }
        ordersValue={
          title: this.film.title,
          duration: this.film.duration,
          type: this.film.type,
          img: this.film.img,
          trailer: this.film.trailer,
          description: this.film.description,
          age: this.film.age,
          rating: this.film.rating,
          city: this.city,
          hour: this.hourValue,
          seats: this.seats,
          id: this.film.id,
        };
        let ordersToSend = this.users[num].orders.slice();
        ordersToSend.push(ordersValue);
        fetch(
          "https://rocky-citadel-32862.herokuapp.com/MovieTheater/users/" +
            userId,
          {
            method: "PUT",
            body: JSON.stringify({
              account: this.users[num].account,
              email: this.users[num].email,
              password: this.users[num].password,
              orders: ordersToSend,
              id: this.users[num].id,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        alert("seats ordered");
        let url = this.$route.path;
        url = url.substr(1, url.length - 5);
        console.log(url);
        this.$router.push("/" + url);
      });
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
.details,
.details-black {
  width: 100%;
  height: calc(100vh - 5rem);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  background-size: 100% 100%;
}
.details-content {
  width: 30%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
}
.one-line {
  display: flex;
}
.details-content h1 {
  font-size: 1.2rem;
}
.one-line #pink {
  color: #c8006d;
  margin-left: 1rem;
  cursor: pointer;
}
.seats button {
  background: #c8006d;
  border-radius: 10px;
  border: 1px solid gray;
  width: 4rem;
  height: 2rem;
  font-size: 1.2rem;
  color: white;
  margin: 1rem 0;
}
.seats button:hover {
  cursor: pointer;
}
.row button {
  width: 3rem;
  height: 3rem;
  margin: 0.2rem;
}
.row button:hover {
  cursor: pointer;
}
#green {
  background-color: green;
}
#green:hover {
  background-color: rgb(1, 163, 1);
}
#white {
  background-color: white;
}
#white:hover {
  background-color: rgb(236, 236, 236);
}
#red {
  background-color: red;
}
#red:hover {
  background-color: rgb(196, 39, 39);
}
.details-black {
  background: rgba(0, 0, 0, 0.699);
  position: relative;
  top: 0;
  left: 0;
  z-index: 3;
  padding-top: 3rem;
}
.row {
  display: flex;
}
.details-display {
  width: 50rem;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}
.separator {
  background: white;
  width: 1px;
  height: 1rem;
  margin: 0 0.5rem;
  color: white;
}
.details h2 {
  color: #c8006d;
  font-size: 4rem;
  margin: 0;
}
.details-display .left,
.details-display .right {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.details-display .right {
  padding: 0 2rem;
}
.details-display .right p {
  padding: 1rem 1rem;
  font-size: 1rem;
  background: rgba(0, 0, 0, 0.541);
  border-radius: 20px;
}
.description {
  width: 120%;
  display: flex;
}
#pink {
  color: #c8006d;
}
#gray {
  color: white;
  font-size: 1rem;
}
.big-line {
  height: 6rem;
  display: flex;
  flex-direction: row;
  width: 80%;
  margin-top: 3rem;
}
.hour-line {
  height: 6rem;
  display: flex;
  flex-direction: row;
  margin-top: 3rem;
}
.line {
  height: 50%;
  display: flex;
  align-items: center;
  width: 50%;
}
.city-div {
  width: 50%;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.city-div select {
  background: rgba(0, 0, 0, 0);
  border: 0;
  border-bottom: 1px solid gray;
  width: 10rem;
  height: 2rem;
  font-size: 1.2rem;
  color: #c8006d;
}
.hour {
  background: rgba(0, 0, 0, 0.5);
  width: 8rem;
  height: 4rem;
  margin-right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #c8006d;
}
.hour h1 {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.hour:hover {
  background: #c8006d;
  cursor: pointer;
}
</style>
