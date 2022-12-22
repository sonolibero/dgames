import React from 'react';

const Choices = ({ handleChoice }) => {
  return (
    <div>
      <button onClick={() => handleChoice('rock')}>Rock</button>
      <button onClick={() => handleChoice('paper')}>Paper</button>
      <button onClick={() => handleChoice('scissors')}>Scissors</button>
    </div>
  );
};

export default Choices;
