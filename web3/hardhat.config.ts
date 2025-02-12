
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200, // Helps reduce contract size
      },
    },
  },
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/DvgZYRy2kl2K7fxdoX06yLf5UhqhG_ir",
      accounts: ['bf71626dfbf7d852fe69491bb340cb6136559ff1d018c1083365171097dbf90b'],
      gasPrice: 225000000000,
      chainId: 11155111, // Correct Sepolia chainId
    },
  },
};

export default config;
