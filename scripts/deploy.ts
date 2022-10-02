// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  const SIS = await ethers.getContractFactory("SIS");
  const sis = await SIS.deploy();

  await sis.deployed();

  const USDT = await ethers.getContractFactory("USDT");
  const usdt = await USDT.deploy();

  await usdt.deployed();

  const Granteed = await ethers.getContractFactory("Granteed");
  const granteed = await Granteed.deploy(usdt.address, sis.address);

  await granteed.deployed();

  await sis.transferOwnership(granteed.address);
  console.log(usdt.address);
  console.log(granteed.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
