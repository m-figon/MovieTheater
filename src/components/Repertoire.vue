<template>
  <div class="repertoire">
    <div class="films">
      <div v-for="item in films" class="film">
        <div class="left">
          <img v-bind:src="item.img" />
        </div>
        <div class="middle">
          <div class="big-line">
            <div class="line">
              <h2>{{item.title}}</h2>
            </div>
            <div class="line">
              <h1>{{item.type}}</h1>
              <div class="separator"></div>
              <h1>Above {{item.age}}</h1>
              <div class="separator"></div>
              <h1>{{item.duration}}</h1>
            </div>
          </div>
          <div class="big-line">
            <p>{{item.description}}</p>
          </div>
        </div>
        <div class="right">
          <div class="big-line">
            <div class="line"></div>
            <div class="line" id="centered">
              <h1 id="pink">{{item.rating}}</h1>
            </div>
            <div class="line" id="centered">
              <h1>Rating</h1>
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
    };
  },
  created() {
    fetch("https://rocky-citadel-32862.herokuapp.com/MovieTheater/films")
      .then((response) => response.json())
      .then((data) => {
        this.films = data.slice();
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
  height: 20rem;
  width: 100%;
  border: 1px solid white;
  display: flex;
}
.film h1 {
  font-size: 1rem;
}
.film h2 {
  font-size: 1.5rem;
}
.separator {
  background: white;
  width: 1px;
  height: 1rem;
  margin: 0 0.5rem;
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
  height: 80%;
}
#pink {
  color: #c8006d;
}
#centered {
  justify-content: center;
}
</style>
