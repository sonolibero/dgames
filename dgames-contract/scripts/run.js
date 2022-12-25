const main = async () => {
    const contractFactory = await hre.ethers.getContractFactory('RPS');
    const contract = await contractFactory.deploy();
    await contract.deployed();
    console.log('contract deployed to:', contract.address);

    let txn = await contract.newGame()
    await txn.wait()
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