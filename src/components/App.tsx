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

  const handlePrevious = () => {
    handleChangePuzzle(false);
  };

  const handleNext = () => {
    handleChangePuzzle(true);
  };

  const handleChangePuzzle = (nextOne: boolean) => {
    const plus = nextOne ? 1 : -1;
    const newIndex = (puzzleNumberIndex + plus + puzzleNumbers.length) % puzzleNumbers.length;
    setPuzzleNumberIndex(newIndex);
  };

  return (
    <div data-testid="app-testid" className={styles.app}>
      <div className={styles.row}>
        <button disabled={status !== 'running'} onClick={handlePause}>Pause</button>
        <Timer />
        <button disabled={status !== 'running'} onClick={handleClearBoard}>Clear Board</button>
      </div>
      <GameBoard puzzleNumber={puzzleNumbers[puzzleNumberIndex]!} />
      <div className={styles.row}>
        <button disabled={status === 'loading'} onClick={handlePrevious}>◀</button>
        Queens #{puzzleNumbers[puzzleNumberIndex]}
        <button disabled={status === 'loading'} onClick={handleNext}>▶</button>
      </div>
      <GameRule />
    </div>
  );
};

export default App;
