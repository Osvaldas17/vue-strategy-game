<template>
  <div class="shopWrapper" v-if="locationSelected || locationSelected === 0">
    <div class="shopBuilding" :class="[!checkIfAvailable(item) ? 'notAvailable' : '']" v-for="(item,index) in shop" :key="index">
      <img :src="item.image" alt="">
      <div>
        <h3>Price</h3>
        <p>Gold: {{ item.cost.gold }}</p>
        <p>Wood: {{ item.cost.wood }}</p>
        <p>Stone: {{ item.cost.stone }}</p>
      </div>
      <div>
        <h3>Profit</h3>
        <p>Gold: {{ item.profit.gold }}</p>
        <p>Wood: {{ item.profit.wood }}</p>
        <p>Stone: {{ item.profit.stone }}</p>
      </div>
      <div v-if="player.buildings[buildingSelected] && player.buildings[buildingSelected].requires.length > 0">
        <h3>Buildings required </h3>
        <p v-for="(item,index) in player.buildings[buildingSelected].requires" :key="index">{{ item }}</p>
      </div>
      <div v-if="checkIfAvailable(item)" @click="buyBuilding(item)" class="buyCon">
        <div class="buy">Purchase</div>
      </div>
      <div v-if="!checkIfAvailable(item)" class="buyCon">
        <div class="buy">Not available</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "ShopComponent",
  computed: {
    ...mapState(['locationSelected', 'shop', 'player', 'buildingSelected'])
  },
  methods: {
    buyBuilding(building) {
      this.$store.dispatch('purchaseBuilding', building)
    },
    checkIfAvailable(item) {
      let arr = []
      this.player.buildings.filter(e => {
        if (e !== null) {
          arr.push(e.name)
        }
      })
      return Object.values(item.requires).every((e) => arr.includes(e))
    }
  }
}
</script>

<style scoped>

img {
  max-width: 100%;
  height: 200px;
}

.shopBuilding {
  width: 150px;
  margin: 20px 10px;
  border: solid 1px #2c3e50;
}

.shopWrapper {
  display: flex;
}

.notAvailable {
  filter: brightness(50%);
}

.buyCon {
  background-color: #2c3e50;
}

.buy {
  padding: 5px 0;
  font-size: 20px;
  font-weight: bold;
  color: white;
  cursor: pointer;
}

.buy:hover {
  color: rgb(254, 232, 109);
}

.buy:active {
  transform: scale(1.03);
}

</style>