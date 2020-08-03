<template>
  <div class="prices">
    <div class="prices-display">
      <h2>Prices</h2>
      <div class="row">
        <div class="left">
          <h2>2D Movies</h2>
          <ul>
            <li>Adults - 9.30$</li>
            <li>Students - 7.44$</li>
            <li>Children - 4.65$</li>
          </ul>
        </div>
        <div class="right">
          <h2>3D Movies</h2>
          <ul>
            <li>Adults - 10.00$</li>
            <li>Students - 8.00$</li>
            <li>Children - 5.00$</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.prices {
  width: 100%;
  height: calc(100vh - 5rem);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  background-size: 100% 100%;
}
.prices-display {
  margin-top:5rem;
  width: 30rem;
  height: 17rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  border: 1px solid white;
  border-radius: 20px;
  overflow: hidden;
   background: url('../assets/bg.jpg');
  background-size: 100% 100%;
}
.row {
  margin:0rem;
  height: 5rem;
  width: 100%;
  display: flex;
}
.prices-display h2{
  margin:0;
  font-size: 2.0rem;
  text-transform: uppercase;
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center;
 
  height:5rem;
  color:#c8006d;
}
.row h2{
  font-size: 1.5rem;
  width: auto;
  height: auto;
  background: none;
  color:gray;
  border-bottom: 1px solid gray;
}
ul{
    list-style-image: url("./film.png");
}
li{
  font-size: 1.5rem;
}
.row .left,
.row .right {
  display: flex;
  width: 50%;
  height: 100%;
  align-items: center;
  flex-direction: column;
}
@media only screen and (max-width: 700px) {
  .prices-display {
  width: 20rem;
  height: 30rem;
}
.row {
  flex-direction: column;
}
.row .left,
.row .right {
  margin-top: 1rem;
  width: 100%;
  height:20rem;
}
}
@media only screen and (max-width: 450px) {
  .prices-display {
  width: 13rem;
  height: 20rem;
}
.prices-display h2{
  font-size: 1.5rem;
}
.row .left,
.row .right {
  margin-top: 0rem;

}
.row h2{
  font-size: 1.0rem;
}
li{
  font-size: 1.0rem;
}
}
</style>
