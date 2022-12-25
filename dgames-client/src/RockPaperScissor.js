import React from 'react';
import socketIOClient from 'socket.io-client';

function RockPaperScissor() {
  const [start, setStart] = React.useState(false);
  const [choice, setChoice] = React.useState('');
  const [result, setResult] = React.useState('');
  const socket = socketIOClient('https://dgames-server.sonolibero.repl.co');

  const chooseRock = () => {
    if(choice) {
      alert('you already chose');
      return;
    }
    setChoice('rock');
    sendChoice();
  }

  const choosePaper = () => {
    if(choice) {
      alert('you already chose');
      return;
    }
    setChoice('paper');
    sendChoice();
  }

  const chooseScissors = () => {
    if(choice) {
      alert('you already chose');
      return;
    }
    setChoice('scissors');
    sendChoice();
  }

  const sendChoice = () => {
    socket.emit('make-choice', choice);
    socket.on('result', (r) => {
      setResult(r);
    });
  }

  const startGame = () => {
    setStart(true)
  }

  const renderPlayerChoice = () => (
    <div>
      <div>player choice: {choice}</div>
      <div>server response: {result}</div>
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
    <button onClick={startGame}>start game</button>
  )

  return (
    <div>
      {start ? ( renderMakeChoice() ) : ( renderStartGame() )}
      {choice ? ( renderPlayerChoice() ) : null}
    </div>
  )
}

export default RockPaperScissor;
