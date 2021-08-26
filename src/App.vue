<template>
  <div class="appWrapper">
    <PlayerMaterials/>
    <BuildingLocations/>
    <ShopComponent/>
    <UpgradeComp/>
  </div>
</template>

<script>
import PlayerMaterials from './components/PlayerMaterials.vue'
import BuildingLocations from "@/components/BuildingLocations";
import ShopComponent from "@/components/ShopComponent";
import UpgradeComp from "@/components/UpgradeComp";

export default {
  name: 'App',
  components: {
    UpgradeComp,
    PlayerMaterials,
    BuildingLocations,
    ShopComponent
  },
  created() {
    this.$store.dispatch('resourceBuildUp')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.appWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
