import { ethers } from "ethers";
import { abi, address } from "../contract/contract";

const url = "https://polygon-mainnet.g.alchemy.com/v2/PTORvcN4KFP437RSKVc2NoPl1ohgI4re";
const provider = new ethers.providers.JsonRpcProvider(url);
export const contract = new ethers.Contract(address, abi, provider);
