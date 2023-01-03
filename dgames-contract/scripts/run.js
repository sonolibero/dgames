const main = async () => {
    const contractFactory = await hre.ethers.getContractFactory('RPS');
    const contract = await contractFactory.deploy();
    await contract.deployed();
    console.log('contract deployed to:', contract.address);

    let txn = await contract.playGame(1, {value : hre.ethers.utils.parseEther('0.001')});
    let result = await txn.wait();
    console.log('transaction here:', txn);
    console.log('returend value here:', result);
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