<template>
  <div class="home">
    <vue-image-slider
      :images="imageArray"
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
      imageArray: [
        "https://www.joblo.com/assets/images/joblo/posters/2020/01/onward-new-poster.jpg",
        "https://www.joblo.com/assets/images/oldsite/posters/images/full/bohemian_rhapsody_poster-xl.jpg",
        "https://www.joblo.com/assets/images/joblo/posters/2019/11/SonicPoster.jpg",
        "https://www.joblo.com/assets/images/joblo/posters/2019/09/knives-out-final-poster.jpg",
      ],
    };
  },
  components: {
    VueImageSlider,
  },
  created() {
    setInterval(() => {
      if (window.innerWidth >= 1000) {
        this.width = window.innerWidth / 2.5;
        this.height = (window.innerHeight * 4) / 5;
      }else if(window.innerWidth < 1000 && window.innerWidth >= 600){
        this.width = window.innerWidth/2;
        this.height = window.innerHeight/2;
      }else{
        this.width = window.innerWidth;
        this.height = window.innerHeight/2;
      }
    }, 200);
  },
  methods: {
    clicking() {
      switch (this.$refs.slider.currentIndex) {
        case 0:
          console.log("onward");
          break;
        case 1:
          console.log("bohemian rhapsody");
          break;
        case 2:
          console.log("sonic");
          break;
        case 3:
          console.log("knvies out");
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
}
.home button {
  position: relative;
  top: -5rem;
  left: 14%;
  background: #000000;
  width: 10rem;
  font-size: 1.2rem;
  height: 3rem;
  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #434343, #000000);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #434343, #000000);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: white;
  border: 1.5px solid #c8006d;
}
.home button:hover {
  -webkit-box-shadow: 0px 0px 20px 0px rgba(200, 0, 109, 1);
  -moz-box-shadow: 0px 0px 20px 0px rgba(200, 0, 109, 1);
  box-shadow: 0px 0px 20px 0px rgba(200, 0, 109, 1);
  cursor: pointer;
}
</style>
