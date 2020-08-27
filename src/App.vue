<template>
  <div id="app">
    <Card :cardList="cardList"></Card>
    <!-- <div>12</div> -->
  </div>
</template>

<script>
import Card from "./components/Card.vue";
const card = require("./card.json");

export default {
  name: "App",
  components: {
    Card,
  },
  data() {
    return {
      cardList: card.cardList,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin: 0px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
