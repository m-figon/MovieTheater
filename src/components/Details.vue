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
              <h1 id="gray">{{film.type}}</h1>
              <div class="separator"></div>
              <h1 id="gray">Above {{film.age}}</h1>
              <div class="separator"></div>
              <h1 id="gray">{{film.duration}}</h1>
            </div>
            <div class="city-div">
              <select v-model="city">
                <option value="City">Choose city</option>
                <option v-for="city in cities" v-bind:value="city">{{city}}</option>
              </select>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      film: null,
      cities: [],
      city: "City",
    };
  },
  created() {
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
      });
  },
  methods: {
    myTrim(x) {
      return x.replace(/\s/g, "-");
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
.details-black {
  background: rgba(0, 0, 0, 0.699);
  position: relative;
  top: 0;
  left: 0;
  z-index: 3;
  padding-top: 3rem;
}
.details-display {
  width: 50rem;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}
.line a {
  text-decoration: none;
  color: white;
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
  flex-direction: column;
  border: 1px solid #c8006d;
}
.hour h1 {
  font-size: 1rem;
  margin: 0;
}
.hour h2 {
  font-size: 1.4rem;
  color: white;
  margin: 0;
}
.hour:hover {
  background: #c8006d;
  cursor: pointer;
}
</style>
