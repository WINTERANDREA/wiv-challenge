# wiv-coding-challenge

## Description
Showing a list displaying all the NFTs from the following ERC-721 Smart Contract (Polygon blockchain network)
- Contract Address 0x57a8d59eff06381a9b0d709271871187ee1b418c | PolygonScan
- Display the NFT images as well as their Brand metadata information.
- In addition to displaying the aforementioned, display their market price in USD, which you can get from Liv-ex Price Data API v2
Each of the NFTs has an LWIN metadata that you can use to pass in as a parameter in that API to get their specific price. If an NFT has no LWIN metadata, just display "No Price Data" for the price section of that NFT.

## Development Framework
Vue.js ^3.2.36

## Coding Challenge Preview
https://wiv-coding-challenge.netlify.app/

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

