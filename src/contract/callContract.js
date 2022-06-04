import { ethers } from "ethers";
import { abi, address } from "../contract/contract";

const url = `https://polygon-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY}`;
const provider = new ethers.providers.JsonRpcProvider(url);
export const contract = new ethers.Contract(address, abi, provider);
