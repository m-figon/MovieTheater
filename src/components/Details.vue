<template>
  <div>
    <div
      class="details"
      v-if="film"
      v-bind:style="[film ? {'background': 'url(' + film.img + ') center no-repeat'} : {'background': '#FFF'}]"
    >
      <div class="details-black">
        <div class="details-display">
          <h2>{{film.title.toUpperCase()}}</h2>
          <div class="big-line">
            <div class="line">
              <h1 id="white">{{film.type}}</h1>
              <div class="separator"></div>
              <h1 id="white">Above {{film.age}}</h1>
              <div class="separator"></div>
              <h1 id="white">{{film.duration}}</h1>
            </div>
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
                <div v-for="hour in cities.hours">
                  <router-link
                    :to="{ path: myTrim(film.title.toLowerCase())+'/buy', query: { myprop: (`${city}-${date}-${hour.hour}-${hour.type}`) } }"
                  >
                    <div class="hour">
                      <h2>{{hour.hour}}</h2>
                      <h1>{{hour.type}}</h1>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="description">
            <div class="left">
              <youtube :video-id="film.trailer" ref="youtube"></youtube>
            </div>
            <div class="right">
              <p>{{film.description}}</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    <div v-if="!loaded" class="loading">
      <img src="../assets/loading.gif" />
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      film: null,
      cities: [],
      city: "City",
      date: null,
      loaded: false
    };
  },
  created() {
    this.date = moment().format("ll");
    fetch("https://rocky-citadel-32862.herokuapp.com/MovieTheater/films")
      .then((response) => response.json())
      .then((data) => {
        let films = [];
        films = data.slice();
        this.filmName = this.$route.path;
        this.filmName = this.filmName.substr(1);
        this.filmName = this.filmName.split("-").join(" ");
        console.log(this.filmName);
        for (let item of films) {
          if (item.title === this.filmName) {
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
        this.loaded=true;
      });
  },
  methods: {
    myTrim(x) {
      return x.replace(/\s/g, "-");
    },
    addDay() {
      this.date = moment(this.date, "ll").add(1, "d");
      this.date = moment(this.date).format("ll");
    },
    subtractDay() {
      this.date = moment(this.date, "ll").subtract(1, "d");
      this.date = moment(this.date).format("ll");
    },
  },
};
</script>

<style scoped src="../style.css">
</style>
