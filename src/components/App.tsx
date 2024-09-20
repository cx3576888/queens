import styles from '../styles/App.module.css';
import { useState } from 'react';
import type { RootState } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { clearBoard } from '../state/slices/boardSlice';
import { setStatus } from '../state/slices/timerSlice';
import { getPuzzleNumbers, getTestPuzzleNumbers } from '../utils/puzzleUtils';
import Timer from './Timer';
import GameBoard from './GameBoard';
import GameRule from './GameRule';

const App: React.FC = () => {
  const puzzleNumbers = getPuzzleNumbers();
  // const puzzleNumbers = getTestPuzzleNumbers(); // testPuzzles for easier debug
  const [puzzleNumberIndex, setPuzzleNumberIndex] = useState(0);
  const { status } = useSelector((state: RootState) => state.timer);
  const dispatch = useDispatch();

  const handlePause = () => {
    dispatch(setStatus('paused'));
  };

  const handleClearBoard = () => {
    dispatch(clearBoard());
  };

  const handleTogglePuzzleNumber = () => {
    const newIndex = (puzzleNumberIndex + 1) % puzzleNumbers.length;
    setPuzzleNumberIndex(newIndex);
  };

  return (
    <div data-testid="app-testid" className={styles.app}>
      <Timer />
      Queens #{puzzleNumbers[puzzleNumberIndex]} <button onClick={handleTogglePuzzleNumber}>Toggle Puzzle Number</button>
      <GameBoard puzzleNumber={puzzleNumbers[puzzleNumberIndex]!} />
      <button disabled={status !== 'running'} onClick={handlePause}>Pause</button>
      <button disabled={status !== 'running'} onClick={handleClearBoard}>Clear Board</button>
      <GameRule />
    </div>
  );
};

export default App;
