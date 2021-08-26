<template>
  <div class="buildingWrapper">
    <div v-for="(item,index) in player.buildings" :key="index">
      <div @click="selectBuildingSpot(index)" v-if="Object.entries(item).length === 0" class="buildingCon"
           :class="[index === locationSelected ? 'selected' : '']">
        <p class="build">BUILD</p>
      </div>
      <div v-else class="buildingCon">
        <div class="buildingSub" :class="[index === buildingSelected ? 'selected' : '']">
          <button @click="sellBuilding(item,index)" class="sell">SELL</button>
          <div class="backgroundImg" :style="{ backgroundImage: `url(${item.image})` }">
            <h3>Level: {{item.level}}</h3>
            <p>Gold: {{ item.profit.gold.toFixed(1) }}</p>
            <p>Wood: {{ item.profit.wood.toFixed(1) }}</p>
            <p>Stone: {{ item.profit.stone.toFixed(1) }}</p>
          </div>
          <button @click="selectBuildingToUpgrade(index)" class="sell">Upgrade</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "BuildingLocations",
  computed: {
    ...mapState(['player', 'locationSelected', 'buildingSelected'])
  },
  methods: {
    selectBuildingSpot(index) {
      this.$store.commit('selectBuildingSpot', index)
    },
    selectBuildingToUpgrade(index) {
      this.$store.commit('selectBuildingToUpgrade', index)
      this.$store.dispatch('setNextUpgrade')
    },
    sellBuilding(item, index) {
      this.$store.dispatch('sellBuilding', [item, index])
    },
  }
}
</script>

<style scoped>

.buildingCon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 200px;
  background-color: #2c3e50;
  margin: 20px 10px;
  cursor: pointer;
}

.sell {
  border: none;
  cursor: pointer;
  padding: 8px 0;
}

.sell:hover {
  background-color: #2c3e50;
  color: white;
}
.buildingSub {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.backgroundImg {
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  color: rgb(186, 104, 200);
  font-weight: bold;
  -webkit-text-stroke: 1px black;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.selected {
  background-color: #344c62;
  transform: scale(1.05);
  border: 2px solid rgb(186, 104, 200);
}

.buildingCon:hover {
  background-color: #344c62;
  transform: scale(1.05);
}

.buildingWrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.build {
  border: none;
  font-size: 25px;
  color: white;
  font-weight: bold;
}

</style>