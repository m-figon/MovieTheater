<template>
  <div>
    <div
      class="buy"
      v-if="film && logedAc!==''"
      v-bind:style="[film ? {'background': 'url(' + film.img + ') center no-repeat'} : {'background': '#FFF'}]"
    >
      <div class="buy-black">
        <div class="buy-display">
          <h2>{{film.title.toUpperCase()}}</h2>
          <div class="big-line">
            <div class="city-div">
              <select v-model="city">
                <option value="City">Choose city</option>
                <option v-for="city in cities" v-bind:value="city">{{city}}</option>
              </select>
            </div>
            <div class="calendar">
              <button v-on:click="subtractDay()" id="left-arrow"></button>
              <h1>{{date}}</h1>
              <button v-on:click="addDay()" id="right-arrow"></button>
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
                    <h2>{{hour.hour}}</h2>
                    <h1>{{hour.type}}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="seats" v-if="rows && city!=='City'">
            <div class="left">
              <div class="row" v-for="(row,index) in rows">
                <div v-for="(seat,key) in row">
                  <div v-if="seat==='0'">
                    <button v-on:click="chooseGreen(index,key)" id="green"></button>
                  </div>
                  <div v-if="seat==='-'">
                    <button v-on:click="chooseWhite(index,key)" id="white-bg"></button>
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
            <div class="right">
              <div class="line">
                <select v-model="adults">
                  <option v-for="n in 51" v-bind:value="parseInt(n-1)">{{ n-1 }}</option>
                </select>
                <h1>Adults</h1>
              </div>
              <div class="line">
                <select v-model="students">
                  <option v-for="n in 51" v-bind:value="parseInt(n-1)">{{ n-1 }}</option>
                </select>
                <h1>Students</h1>
              </div>
              <div class="line">
                <select v-model="children">
                  <option v-for="n in 51" v-bind:value="parseInt(n-1)">{{ n-1 }}</option>
                </select>
                <h1>Children</h1>
              </div>
              <button v-on:click="order()">Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="buy" v-else-if="logedAc===''">
      <div class="buy-content">
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
import moment from "moment";
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
      date: null,
      typeValue: null,
      adults: 0,
      students: 0,
      children: 0,
      price: 0,
    };
  },
  created() {
    this.date = moment().format("ll");

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
          this.date = this.params[1];
          this.hourValue = this.params[2];
          this.typeValue = this.params[3];
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
      e.stopPropagation();
      console.log(e.target.tagName);
      if (e.target.tagName === "DIV") {
        this.hourValue = e.target.firstChild.innerHTML;
        this.typeValue = e.target.firstChild.nextElementSibling.innerHTML;
        console.log(e.target);
        console.log(this.hourValue);
        console.log(this.typeValue);
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
      }
      if (e.target.tagName === "H1" || e.target.tagName === "H2") {
        this.hourValue = e.target.parentElement.firstChild.innerHTML;
        this.typeValue =
          e.target.parentElement.firstChild.nextElementSibling.innerHTML;
        console.log(e.target);
        console.log(this.hourValue);
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
        e.target.parentElement.style.backgroundColor = "#c8006d";
        this.previousTarget = e.target.parentElement;
        this.hourIndex = i;
        console.log(this.hourIndex);
        this.rows = str.split(",");
        console.log(this.rows);
      }
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
      switch (id1) {
        case 0:
          first = "A";
          break;
        case 1:
          first = "B";
          break;
        case 2:
          first = "C";
          break;
        case 3:
          first = "D";
          break;
      }
      this.seats.push(first + "" + second);
      console.log(this.seats);
    },
    chooseWhite(id1, id2) {
      let tmp = this.rows.slice();
      tmp[id1] = this.setCharAt(tmp[id1], id2, "0");
      this.rows = tmp.slice();
      console.log(this.rows);
      let second = id2;
      let first;
      switch (id1) {
        case 0:
          first = "A";
          break;
        case 1:
          first = "B";
          break;
        case 2:
          first = "C";
          break;
        case 3:
          first = "D";
          break;
      }
      for (let [index, item] of this.seats.entries()) {
        if (item === first + "" + second) {
          this.seats.splice(index, 1);
        }
      }
      console.log(this.seats);
    },
    chooseRed() {
      alert("this place is unavailable");
    },
    order() {
      if (
        this.seats.length ==
        parseInt(this.adults) +
          parseInt(this.students) +
          parseInt(this.children)
      ) {
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
          ordersValue = {
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
            type: this.typeValue,
            seats: this.seats,
            price: this.price,
            date: this.date,
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
      } else {
        alert("not enough person");
      }
    },
    login() {
      this.$store.commit("changeLogin", true);
      this.$store.commit("changeRegister", false);
    },
    register() {
      this.$store.commit("changeRegister", true);
      this.$store.commit("changeLogin", false);
    },
    addDay() {
      this.date = moment(this.date, "ll").add(1, "d");
      this.date = moment(this.date).format("ll");
    },
    subtractDay() {
      this.date = moment(this.date, "ll").subtract(1, "d");
      this.date = moment(this.date).format("ll");
    },
    calculatPrice() {
      this.price = 0;
      if (this.typeValue.includes("2D")) {
        this.price += this.adults * 9.3;
        this.price += this.students * 7.44;
        this.price += this.children * 4.65;
      } else if (this.typeValue.includes("3D")) {
        this.price += this.adults * 10.0;
        this.price += this.students * 8.0;
        this.price += this.children * 5.0;
      }
      this.price = this.price.toFixed(2);
      console.log(this.price);
    },
  },
  watch: {
    adults: function () {
      this.calculatPrice();
    },
    students: function () {
      this.calculatPrice();
    },
    children: function () {
      this.calculatPrice();
    },
  },
};
</script>

<style scoped src="../style.css">

</style>
