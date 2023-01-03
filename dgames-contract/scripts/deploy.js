const main = async () => {
  const contractFactory = await hre.ethers.getContractFactory('RPS');
  const contract = await contractFactory.deploy({value: hre.ethers.utils.parseEther('0.005')});
  await contract.deployed();
  console.log('contract deployed to:', contract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();