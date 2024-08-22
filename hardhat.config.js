//require("dotenv").config();
//require("dotenv").config({path:"./.env"})
require('dotenv').config({path:__dirname+'/.env'})
//require('dotenv').config({ path: __dirname + '/.env' })
//import { config as dotEnvConfig } from "dotenv";
//dotEnvConfig();
require("@nomicfoundation/hardhat-toolbox");
require("@fireblocks/hardhat-fireblocks");
const { ApiBaseUrl } = require("@fireblocks/fireblocks-web3-provider");
const fs = require("fs")



const apiKey = process.env.FIREBLOCKS_API_KEY;
const secretKey = fs.readFileSync(
  process.env.FIREBLOCKS_SECRET_KEY_PATH,
  "utf8"
);
//const secretKey = process.env.FIREBLOCKS_SECRET_KEY_PATH;


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.1",
  networks: {
    sepolia: {
      url: "https://ethereum-sepolia-rpc.publicnode.com",
      fireblocks: {
        apiBaseUrl: ApiBaseUrl.Sandbox,
        privateKey: secretKey,
        apiKey: apiKey,
        vaultAccountIds: "0",
      },
    },
  },
};

