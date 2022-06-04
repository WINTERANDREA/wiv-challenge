<script >
import { contract } from '../contract/callContract.js'
import WivItem from "./WivItem.vue";

export default {
  data() {
    return {
      totalSupply: null,
    };
  },
  methods: {
    async getTotalSupplyInt() {
      let _totalSupply = await contract.totalSupply()
      let totalSupply = Number(_totalSupply)
      this.totalSupply = totalSupply
    }
  },
  mounted() {
    try {
      this.getTotalSupplyInt()
    } catch (e) {
      console.log("error", e)
    }
  },
  components: { WivItem }

}
</script>

<template>
  <section>
    <h1>Marketplace</h1>
    <p>Wine available: {{ totalSupply }}</p>
    <div class="wiv-container">
      <div v-for="index in totalSupply">
        <WivItem :tokenIndex="index" />
      </div>
    </div>
  </section>
</template>

<style>
.wiv-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
</style>
