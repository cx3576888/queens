import styles from '../styles/App.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setIsPaused } from '../state/slices/timerSlice';
import Timer from './Timer';
import GameBoard from './GameBoard';
import GameRule from './GameRule';

const App: React.FC = () => {
  const puzzleNumbers = [100, 109, 110, 111, 112, 113, 114];
  const [puzzleNumberIndex, setPuzzleNumberIndex] = useState(0);
  const dispatch = useDispatch();

  const handlePause = () => {
    dispatch(setIsPaused(true));
  };

  const handleTogglePuzzleNumber = () => {
    const newIndex = (puzzleNumberIndex + 1) % puzzleNumbers.length;
    setPuzzleNumberIndex(newIndex);
  };

  return (
    <div data-testid="app-testid" className={styles.app}>
      <Timer />
      Queens #{puzzleNumbers[puzzleNumberIndex]} {<button onClick={handleTogglePuzzleNumber}>Toggle Puzzle Number</button>}
      <GameBoard puzzleNumber={puzzleNumbers[puzzleNumberIndex]!} />
      {<button onClick={handlePause}>Pause</button>}
      <GameRule />
    </div>
  );
};

export default App;
