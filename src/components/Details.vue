<template>
  <div class="repertoire">
    <h2>{{film.title.toUpperCase()}}</h2>
    <youtube :video-id="film.trailer" ref="youtube" @playing="playing"></youtube>
  </div>
</template>

<script>
export default {
  data() {
    return {
      film: null,
    };
  },
  created() {
    fetch("https://rocky-citadel-32862.herokuapp.com/MovieTheater/films")
      .then((response) => response.json())
      .then((data) => {
        let films=[];
        films = data.slice();
        this.filmName = this.$route.path;
        this.filmName = this.filmName.substr(1);
        this.filmName = this.filmName.replace("-", " ");
        console.log(this.filmName);
        for (let item of films) {
          if (item.title === this.filmName) {
            this.film = item;
          }
        }
        console.log(this.film);
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
