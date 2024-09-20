import type { RootState } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { setPuzzleNumber } from '../state/slices/gameSettingsSlice';
import { useState } from 'react';
import { getPuzzleNumbers, getTestPuzzleNumbers } from '../utils/puzzleUtils';

import styles from '../styles/PuzzleControls.module.css';

const PuzzleControls: React.FC = () => {
  const puzzleNumbers = getPuzzleNumbers();
  // const puzzleNumbers = getTestPuzzleNumbers(); // testPuzzles for easier debug
  const [puzzleNumberIndex, setPuzzleNumberIndex] = useState(0);
  const { status } = useSelector((state: RootState) => state.timer);
  const dispatch = useDispatch();

  const handleChangePuzzle = (nextOne: boolean) => {
    const plus = nextOne ? 1 : -1;
    const newIndex = (puzzleNumberIndex + plus + puzzleNumbers.length) % puzzleNumbers.length;
    setPuzzleNumberIndex(newIndex);
    dispatch(setPuzzleNumber(puzzleNumbers[newIndex]!));
  };

  return (
    <div className={styles.puzzleControls}>
      <button disabled={status === 'loading'} onClick={() => handleChangePuzzle(false)}>◀</button>
      Queens #{puzzleNumbers[puzzleNumberIndex]}
      <button disabled={status === 'loading'} onClick={() => handleChangePuzzle(true)}>▶</button>
    </div>
  );
};

export default PuzzleControls;
