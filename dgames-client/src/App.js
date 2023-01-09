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
    <div>
      <button onClick={connectWallet}>connect wallet</button>
    </div>
  )

  const selectGame = () => {
    setGame('rps');
  }

  const renderSelectGame = () => (
    <div>
      <p style={{color: '#FFDD00'}}>select game</p>
      <button onClick={selectGame}>
        rock paper scissor
      </button>
    </div>
  )

  React.useEffect(() => {
    walletConnected();
  })

  return (
    <div className='app'>
      <div className='container'>
        <div className='header-container'>
          {currentAccount === '' ? ( renderConnectWallet() ) : <p>ur addy: <b>{currentAccount}</b></p>}
          {currentAccount !== '' & !game ? ( renderSelectGame() ) : null}
          {game === 'rps' ? ( <RockPaperScissor /> ) : null}
        </div>
        <div className='footer-container'>
          <a href={TWITTER_LINK} target="_blank" rel="noreferrer">{`built by @${TWITTER_HANDLE}`}</a></div>
      </div>
    </div>
  )
}

export default App;
