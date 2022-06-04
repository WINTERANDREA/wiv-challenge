<script>
import { contract } from '../contract/callContract.js'
import axios from "axios"

let lwinPriceType = ["A"]
let lwinPriceCurrency = "EUR"


export default {
  props: {
    tokenIndex: Number,
  },
  data() {
    return {
      name: null,
      image: null,
      price: [],
      loadingComplete: false
    };
  },
  methods: {
    async getContractData() {
      let _tokenURI = await contract.tokenURI(this.tokenIndex)
      let tokenURI = _tokenURI
      let response = await axios.get(tokenURI)
      this.info = response
      this.name = response.data.name
      this.image = response.data.image
      this.attributesArray = response.data.attributes
      let lwin = this.search("LWIN", this.attributesArray)
      this.getLwinPrice([lwin], lwinPriceType, lwinPriceCurrency)
    },
    async getLwinPrice(lwin, priceType, currency) {
      var data = JSON.stringify({
        "lwin": lwin,
        "priceType": priceType,
        "currency": currency
      });
      let config = {
        method: 'post',
        url: 'https://sandbox-api.liv-ex.com/data/v2/priceData',
        headers: {
          'CLIENT_KEY': import.meta.env.VITE_CLIENT_KEY,
          'CLIENT_SECRET': import.meta.env.VITE_CLIENT_SECRET,
          'ACCEPT': 'application/json',
          'CONTENT-TYPE': 'application/json'
        },
        data: data
      };
      let response = await axios(config)
      this.price = response.data.lwinDetail[0].dataDetail
      this.loadingComplete = true
    },
    search(key, inputArray) {
      for (let i = 0; i < inputArray.length; i++) {
        if (inputArray[i].trait_type === key) {
          return inputArray[i].value;
        }
      }
    }
  },
  mounted() {
    try {
      this.getContractData()
    } catch (e) {
      console.log("error", e)
    }
  }

}
</script>

<template>
  <div v-if="loadingComplete" class="wiv-card">
    <img :src="image" :alt="name" />
    <div class="info">
      <h1>{{ name }}</h1>
      <div>
        <p v-if="price.length >= 1 && price[0].priceData">
          Market Price: <span>{{ price[0].priceData }} &nbsp; {{ price[0].currency }}</span>
        </p>
        <p v-else>
          Market Price not available!😥
        </p>
      </div>
    </div>
  </div>
  <div v-else class="lds-ripple">
    <div></div>
    <div></div>
  </div>
</template>

<style>
.wiv-card {
  width: 250px;
  min-height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, .3);
  margin: 10px;
}

.info {
  color: #444;
  padding: 10px;
  font-size: 12px;
  line-height: 20px;
}

p span {
  font-weight: bold;
}

.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.lds-ripple div {
  position: absolute;
  border: 4px solid var(--wiv);
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}

@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }

  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }

  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }

  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>