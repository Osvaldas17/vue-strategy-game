<template>
  <div v-if="buildingSelected || buildingSelected === 0">
    <div v-if="player.buildings[buildingSelected].level < 5">
      <div class="upgradeBtn" @click="upgradeBuilding()">Upgrade</div>
      <h2>Requirements</h2>
      <p>Gold: {{ nextUpgrade.cost.gold.toFixed() }}</p>
      <p>Wood: {{ nextUpgrade.cost.wood.toFixed() }}</p>
      <p>Stone: {{ nextUpgrade.cost.stone.toFixed() }}</p>
      <h2>Profits</h2>
      <p>Gold: {{ nextUpgrade.profit.gold.toFixed(1) }}</p>
      <p>Wood: {{ nextUpgrade.profit.wood.toFixed(1) }}</p>
      <p>Stone: {{ nextUpgrade.profit.stone.toFixed(1) }}</p>

    </div>
    <div v-else>
      <h1>Upgraded to maximum level</h1>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "UpgradeComp",
  computed: {
    ...mapState(['buildingSelected', 'player', 'nextUpgrade'])
  },
  methods: {
    upgradeBuilding() {
      this.$store.dispatch('upgradeBuilding')
    },
  },
}
</script>

<style scoped>

.upgradeBtn {
  margin-top: 50px;
  padding: 30px;
  font-size: 30px;
  font-weight: bold;
  background-color: rgb(239, 239, 239);
  cursor: pointer;
}

p {
  font-size: 20px;
  font-weight: bold;
  padding: 5px;
  margin: 5px;
  background-color: #2c3e50;
  color: white;

}

.upgradeBtn:hover {
  background-color: #2c3e50;
  color: white;
  transform: scale(1.05);
}

</style>