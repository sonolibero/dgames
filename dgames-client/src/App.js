import './App.css';
import React from 'react';
import RockPaperScissor from './RockPaperScissor';
import socketIOClient from 'socket.io-client';
// import ethers from 'ethers';

function App() {
  const [currentAccount, setCurrentAccount] = React.useState('');
  const [choice, setChoice] = React.useState('');
  const [result, setResult] = React.useState('');
  const [game, setGame] = React.useState('');
  const socket = socketIOClient('https://dgames-server.sonolibero.repl.co:3000');

  const walletConnected = async () => {
    const { ethereum } = window;

    if(!ethereum) {
      return;
    }

    const accounts = await ethereum.request({ method: 'eth_accounts'});

    if(accounts.length !== 0){
      setCurrentAccount(accounts[0]);
    }
    else {
      setCurrentAccount('');
    }
  }

  const connectWallet = async () => {
      const { ethereum } = window;

      if(!ethereum) {
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      setCurrentAccount(accounts[0]);
  }

  const handleChoice = (c) => {
    if(choice) {
      alert('you already chose');
      return;
    }
    setChoice(c);

    socket.emit('make-choice', c);
    socket.on('result', (r) => {
      setResult(r);
    });
  };

  const renderConnectWallet = () => (
    <button onClick={connectWallet}>
      connect wallet
    </button>
  )

  const selectGame = () => {
    setGame('rps');
  }

  const renderSelectGame = () => (
    <div>
      <p>select game</p>
      <button onClick={selectGame}>
        rock paper scissor
      </button>
    </div>
  )

  const renderRockPaperScissor = () => (
    <div>
      <p>make your choice</p>
      <RockPaperScissor handleChoice={handleChoice} />
    </div>
  )

  const renderPlayerChoice = () => (
    <div>
      <div>player choice: {choice}</div>
      <div>server response: {result}</div>
    </div>
  )

  React.useEffect(() => {
    walletConnected();
  })

  return (
    <div>
      {currentAccount === '' ? ( renderConnectWallet() ) : <p>connected account: {currentAccount}</p>}
      {currentAccount !== '' & !game ? ( renderSelectGame() ) : null}
      {game === 'rps' ? ( renderRockPaperScissor() ) : null}
      {choice ? ( renderPlayerChoice() ) : null}
    </div>
  )
}

export default App;
