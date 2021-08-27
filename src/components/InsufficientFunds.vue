<template>
  <div class="insufficientFunds">
    <h2  v-if="insufficientFunds">not enough materials</h2>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "InsufficientFunds",
  computed: {
    ...mapState(['insufficientFunds'])
  }
}
</script>

<style scoped>

.insufficientFunds {
  padding: 15px 0;
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f54949;
  background-color: rgb(239,239,239);
}

</style>