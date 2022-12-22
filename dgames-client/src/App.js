import './App.css';
import Choices from './Choices';

function App() {
  const handleChoice = (choice) => {
    // Send the choice to the server or handle it in some other way
  };

  return (
    <div>
      <Choices handleChoice={handleChoice} />
    </div>
  );
};

export default App;
