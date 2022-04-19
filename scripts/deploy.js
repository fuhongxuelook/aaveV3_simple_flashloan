// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {

  let provider = hre.ethers.provider;
  let signer = provider.getSigner();
  console.log(await signer.getAddress());
  console.log(await signer.getBalance());
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled

  await hre.run('compile');


  const Obj = await hre.ethers.getContractFactory("V3FlashLoan");
  const ido = await Obj.deploy("0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb");

  await ido.deployed();

  console.log("ido deployed to:", ido.address);

  const FlashLoan = await ido.startFlashLoan("0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063");
  const TX = await FlashLoan.wait();
  console.log(TX.transactionHash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



// async function main() {
//     const [deployer] = await ethers.getSigners();
  
//     console.log("Deploying contracts with the account:", deployer.address);
  
//     console.log("Account balance:", (await deployer.getBalance()).toString());
  
//     const FactoryContract = await ethers.getContractFactory("V3FlashLoan");
//     const FactoryDeployer = await FactoryContract.deploy('0xD90db1ca5A6e9873BCD9B0279AE038272b656728');

  
//     console.log("Token address:", FactoryDeployer.address);
//   }
  
//   main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//       console.error(error);
//       process.exit(1);
//     });