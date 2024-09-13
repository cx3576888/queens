import styles from '../styles/App.module.css';
import { useState } from 'react';
import type { RootState } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { clearBoard } from '../state/slices/boardSlice';
import { setIsPaused } from '../state/slices/timerSlice';
import { getPuzzleNumbers, getTestPuzzleNumbers } from '../utils/puzzleNumberUtils';
import Timer from './Timer';
import GameBoard from './GameBoard';
import GameRule from './GameRule';

const App: React.FC = () => {
  const puzzleNumbers = getPuzzleNumbers();
  // const puzzleNumbers = getTestPuzzleNumbers(); // testPuzzles for easier debug
  const [puzzleNumberIndex, setPuzzleNumberIndex] = useState(0);
  const { isWin } = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();

  const handlePause = () => {
    dispatch(setIsPaused(true));
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
      <button disabled={isWin} onClick={handlePause}>Pause</button>
      <button disabled={isWin} onClick={handleClearBoard}>Clear Board</button>
      <GameRule />
    </div>
  );
};

export default App;
