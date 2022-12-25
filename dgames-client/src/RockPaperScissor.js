import React from 'react';
import { ethers } from 'ethers';
import RPS from './utils/RPS.json';

function RockPaperScissor() {
  const [start, setStart] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  const [choice, setChoice] = React.useState('');
  const [computer, setComputer] = React.useState('');
  const [result, setResult] = React.useState('');
  const CONTRACT_ADDRESS = '0x7A6cacDB73b9f037C67E41Afe693D344769977Cb';

  const chooseRock = () => {
    if(choice) {
      alert('you already chose');
      return;
    }
    setChoice('rock');
  }

  const choosePaper = () => {
    if(choice) {
      alert('you already chose');
      return;
    }
    setChoice('paper');
  }

  const chooseScissors = () => {
    if(choice) {
      alert('you already chose');
      return;
    }
    setChoice('scissors');
  }

  const randomPick = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  const startGame = async () => {
    if(processing) {
      alert('game starting soon');
      return;
    }
    try{
      const { ethereum } = window;
      let chainId = await ethereum.request({ method: 'eth_chainId' });
      const goerliChainId = '0x5';
      if (chainId !== goerliChainId) {
        alert('pls connect to Goerli Testnet');
        return;
      }
  
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, RPS.abi, signer);

      const txn =  await contract.newGame({value : ethers.utils.parseEther('0.001')});
      setProcessing(true)
      await txn.wait();
      setProcessing(false)
      setStart(true);
    }
    catch(error) {
      setProcessing(false)
      if(error.code === 'ACTION_REJECTED') {
        alert('accept the transaction to start a new game')
      }
      else if(error.code === 'TRANSACTION_REPLACED') {
        alert('transaction has been canceled')
      }
      else {
        alert(`pls contact @verci_eth to report this error\n\nerror code: ${error.code}\n\n${error}`)
      }
    }
  }

  const renderPlayerChoice = () => (
    <div>
      <div>player choice: {choice}</div>
      <div>computer choice: {computer}</div>
      <div>game result: {result}</div>
    </div>
  )

  const renderMakeChoice = () => (
    <div>
      <p>make your choice</p>
      <button onClick={chooseRock}>rock</button>
      <button onClick={choosePaper}>paper</button>
      <button onClick={chooseScissors}>scissors</button>
    </div>
  )

  const renderStartGame = () => (
    <div>
      <button onClick={startGame}>start new game</button>
      {processing ? <p>starting new game..</p> : null}
    </div>
  )

  React.useEffect(() => {
    setComputer(randomPick(['rock', 'paper', 'scissors']));

    if (choice === computer) {
      setResult('tie');
    } else if (
      (choice === 'rock' && computer === 'scissors') ||
      (choice === 'scissors' && computer === 'paper') ||
      (choice === 'paper' && computer === 'rock')
    ) {
      setResult('you win');
    } else {
      setResult('you lose');
    }
  }, [choice, computer]);

  return (
    <div>
      {start ? ( renderMakeChoice() ) : ( renderStartGame() )}
      {choice ? ( renderPlayerChoice() ) : null}
    </div>
  )
}

export default RockPaperScissor;
