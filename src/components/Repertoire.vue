<template>
  <div class="repertoire">
    <div class="city-div">
    <select v-model="city">
      <option value="City">Choose city</option>
      <option v-for="city in cities" v-bind:value="city">{{city}}</option>
    </select>  
    <calendar v-bind:date="date" v-on:changeDate="updateDate($event)"/>
    </div>

    <div class="films">
      <div v-for="item in films" class="film">
        <div class="left">
          <img v-bind:src="item.img" />
        </div>
        <div class="middle">
          <div class="big-line">
            <div class="line">
              <router-link v-bind:to="myTrim(item.title.toLowerCase())">
                <h2>{{item.title}}</h2>
              </router-link>
            </div>
            <div class="line" id="gray">
              <h1>{{item.genre}}</h1>
              <div class="separator"></div>
              <h1>Above {{item.age}}</h1>
              <div class="separator"></div>
              <h1>{{item.duration}}</h1>
            </div>
          </div>
          <div class="p-line">
            <p>{{item.description}}</p>
          </div>
          <div class="b-line" v-if="city!='City'">
            <div v-for="cities in item.cities">
              <div class="line" id="hours" v-if="cities.name===city">
                <div v-for="hour in cities.hours">
                  <router-link
                    :to="{ path: myTrim(item.title.toLowerCase())+'/buy', query: { myprop: (`${city}-${date}-${hour.hour}-${hour.type}`) } }"
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
        </div>
        <div class="right">
          <div class="big-line">
            <div class="line"></div>
            <div class="line" id="centered">
              <h1 id="pink">{{item.rating}}</h1>
            </div>
            <div class="line" id="centered">
              <h1 id="gray">Rating</h1>
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
import Calendar from './Calendar';

export default {
  components: {
    calendar: Calendar
      },
  data() {
    return {
      films: [],
      city: "City",
      cities: [],
      date: null,
      loaded: false
    };
  },
  methods: {
    myTrim(x) {
      return x.replace(/\s/g, "-");
    },
    updateDate(newDate){
      this.date=newDate;
    }
  },
  created() {
    this.date = moment().format("ll");
    fetch("https://rocky-citadel-32862.herokuapp.com/MovieTheater/films")
      .then((response) => response.json())
      .then((data) => {
        this.films = data.slice();
        for (let item of this.films) {
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="../style.css">

</style>
