<template>
  <div class="repertoire">
    <div class="city-div">
      <select v-model="city">
        <option value="City">Choose city</option>
        <option v-for="city in cities" v-bind:value="city">{{city}}</option>
      </select>
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
              <h1>{{item.type}}</h1>
              <div class="separator"></div>
              <h1>Above {{item.age}}</h1>
              <div class="separator"></div>
              <h1>{{item.duration}}</h1>
            </div>
          </div>
          <div class="p-line">
            <p>{{item.description}}</p>
          </div>
          <div class="big-line" v-if="city!='City'">
            <div v-for="cities in item.cities">
              <div class="line" v-if="cities.name===city">
                <div v-for="hour in cities.hours">
                  <div class="hour">
                    <h1>{{hour}}</h1>
                  </div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      films: [],
      city: "City",
      cities: [],
    };
  },
  methods: {
    myTrim(x) {
      return x.replace(/\s/g,'-');
    },
  },
  created() {
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
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a{
  text-decoration: none;
  color: #c8006d;
}
.repertoire {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.city-div {
  width: 60%;
  height: 4rem;
  display: flex;
  justify-content: flex-start;
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
  width: 4rem;
  height: 2.5rem;
  margin-right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #c8006d;
}
.hour:hover {
  background: #c8006d;
  cursor: pointer;
}
.repertoire h1,
.repertoire h2 {
  margin: 0;
}
.films {
  width: 60%;
  display: flex;
  flex-direction: column;
}
.film {
  height: 22rem;
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
.left {
  width: 20%;
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
  height: 6rem;
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
  height: 50%;
  display: flex;
  align-items: center;
  width: 100%;
}
.right {
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}
.left img {
  width: 90%;
  height: 70%;
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
