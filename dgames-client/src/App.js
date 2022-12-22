import './App.css';
import React from 'react';
import Choices from './Choices';
// import ethers from 'ethers';

function App() {
  const [currentAccount, setCurrentAccount] = React.useState("");

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
      setCurrentAccount("");
    }
  }

  const connectWallet = async () => {
      const { ethereum } = window;

      if(!ethereum) {
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      setCurrentAccount(accounts[0]);
  }

  const renderConnectWallet = () => (
    <button onClick={connectWallet}>
      connect wallet
    </button>
  )

  const renderChoices = () => (
    <div>
      <p>connected account: {currentAccount}</p>
      <Choices handleChoice={handleChoice} />
    </div>
  )

  const handleChoice = (choice) => {
    // Send the choice to the server or handle it in some other way
  }

  React.useEffect(() => {
    walletConnected();
  })

  return (
    <div>
      {currentAccount === "" ? ( renderConnectWallet() ) : ( renderChoices() )}
    </div>
  )
}

export default App;
