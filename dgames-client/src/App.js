import './App.css';
import React from 'react';
import RockPaperScissor from './RockPaperScissor';
import socketIOClient from 'socket.io-client';
// import ethers from 'ethers';

function App() {
  const [currentAccount, setCurrentAccount] = React.useState('');
  const [choice, setChoice] = React.useState('');
  const [result, setResult] = React.useState('');
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
    if(choice) {
      alert('you already chose');
      return;
    }
    setChoice(c);

    socket.emit('make-choice', c);
    socket.on('result', (r) => {
      setResult(r);
    });
  };

  React.useEffect(() => {
    walletConnected();
  })

  const renderConnectWallet = () => (
    <button onClick={connectWallet}>
      connect wallet
    </button>
  )

  const renderRockPaperScissor = () => (
    <div>
      <p>connected account: {currentAccount}</p>
      <RockPaperScissor handleChoice={handleChoice} />
    </div>
  )

  return (
    <div>
      {currentAccount === '' ? ( renderConnectWallet() ) : ( renderRockPaperScissor() )}
      {choice ? <div>player chose: {choice}</div> : null}
      {choice ? <div>server response: {result}</div> : null}
    </div>
  )
}

export default App;
