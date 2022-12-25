import './App.css';
import React from 'react';
import RockPaperScissor from './RockPaperScissor';

function App() {
  const TWITTER_HANDLE = 'verci_eth';
  const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
  const [currentAccount, setCurrentAccount] = React.useState('');
  const [game, setGame] = React.useState('');

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

  React.useEffect(() => {
    walletConnected();
  })

  return (
    <div>
      <a href={TWITTER_LINK} target="_blank" rel="noreferrer">{`built by @${TWITTER_HANDLE}`}</a>
      {currentAccount === '' ? ( renderConnectWallet() ) : <p>connected account: {currentAccount}</p>}
      {currentAccount !== '' & !game ? ( renderSelectGame() ) : null}
      {game === 'rps' ? ( <RockPaperScissor /> ) : null}
    </div>
  )
}

export default App;
