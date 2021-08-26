<template>
  <div class="playerMaterials">
    <div>
      <h3>Gold:</h3>
      <h3 class="yellow">{{ player.stats.gold.toFixed() }}</h3>
    </div>
    <div>
      <h3>Wood:</h3>
      <h3 class="brown">{{ player.stats.wood.toFixed() }}</h3>
    </div>
    <div>
      <h3>Stone:</h3>
      <h3 class="grey">{{ player.stats.stone.toFixed() }}</h3>
    </div>
    <div>
      <h3>Gold rate:</h3>
      <h3 class="yellow">{{gatheringRates.gold.toFixed(1)}}</h3>
    </div>
    <div>
      <h3>Wood rate:</h3>
      <h3 class="brown">{{ gatheringRates.wood.toFixed(1) }}</h3>
    </div>
    <div>
      <h3>Stone rate:</h3>
      <h3 class="grey">{{gatheringRates.stone.toFixed(1)}}</h3>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'PlayerMaterials',
  computed: {
    ...mapState(['player','gatheringRates']),
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.playerMaterials {
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #2c3e50;
  color: white;
  padding: 30px;
}

.playerMaterials div {
  margin: 0 30px;
}

.profits {
}

.brown {
  color: saddlebrown;
}

.yellow {
  color: rgb(254, 232, 109);
}

.grey {
  color: grey;
}

</style>
