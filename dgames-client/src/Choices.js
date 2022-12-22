import React from 'react';

const Choices = ({ handleChoice }) => {
  return (
    <div>
      <button onClick={() => handleChoice('rock')}>rock</button>
      <button onClick={() => handleChoice('paper')}>paper</button>
      <button onClick={() => handleChoice('scissors')}>scissors</button>
    </div>
  );
};

export default Choices;
