<template>
  <div class="home">
    <vue-image-slider
      :images="posters"
      ref="slider"
      :intervalVal="3000"
      v-bind:height="height"
      v-bind:width="width"
    />
    <button v-on:click="clicking()">BUY TICKET</button>
  </div>
</template>

<script>
import VueImageSlider from "vue-image-slider";

export default {
  data() {
    return {
      width: 0,
      height: 0,
      films: [],
      posters: [],
    };
  },
  components: {
    VueImageSlider,
  },
  created() {
    setInterval(() => {
      if (window.innerWidth >= 1250) {
        this.width = window.innerWidth / 1.5;
        this.height = (window.innerHeight * 4) / 5;
      } else if (window.innerWidth < 1250 && window.innerWidth >= 800) {
        this.width = window.innerWidth / 1.2;
        this.height = window.innerHeight / 1.5;
      } else {
        this.width = window.innerWidth;
        this.height = window.innerHeight / 2;
      }
    }, 200);
    fetch("https://rocky-citadel-32862.herokuapp.com/MovieTheater/films")
      .then((response) => response.json())
      .then((data) => {
        this.films = data.slice();
        console.log(this.films);
        for (let item of this.films) {
          this.posters.push(item.homeImg);
        }
      });
  },
  methods: {
    clicking() {
      switch (this.$refs.slider.currentIndex) {
        case 0:
          console.log("bohemian-rhapsody");
          this.$router.push("bohemian-rhapsody/buy");

          break;
        case 1:
          console.log("onward");
          this.$router.push("onward/buy");
          break;
        case 2:
          console.log("sonic-the-hedgehog");
          this.$router.push("sonic-the-hedgehog/buy");
          break;
        case 3:
          console.log("knvies out");
          this.$router.push("knives-out/buy");
          break;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2rem;
}
.home button {
  position: relative;
  top: -5rem;
  left: 25%;
  background: #00000000;
  width: 10rem;
  font-size: 1.2rem;
  height: 3rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: 1.5px solid #c8006d;
}
.home button:hover {
  -webkit-box-shadow: 0px 0px 20px 0px rgba(200, 0, 109, 1);
  -moz-box-shadow: 0px 0px 20px 0px rgba(200, 0, 109, 1);
  box-shadow: 0px 0px 20px 0px rgba(200, 0, 109, 1);
  cursor: pointer;
}
@media only screen and (max-width: 800px) {
  .home button {
    width: 7rem;
    font-size: 1rem;
    height: 2.5rem;
  }
}
</style>
