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

<script >
import { ethers } from "ethers";
import { abi, address } from '../contract/contract'
import WivItem from "./WivItem.vue";

const url = "https://polygon-mainnet.g.alchemy.com/v2/PTORvcN4KFP437RSKVc2NoPl1ohgI4re";
const provider = new ethers.providers.JsonRpcProvider(url);
const contract = new ethers.Contract(address, abi, provider);
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
      console.log("total supply", totalSupply)
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

<style>
.wiv-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
</style>
