import type { RootState } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { setPuzzleNumber } from '../state/slices/gameSettingsSlice';
import { getPuzzleNumbers } from '../utils/puzzleUtils';
// import { getTestPuzzleNumbers } from '../utils/puzzleUtils';
import PuzzleSelector from './PuzzleSelector';

import styles from '../styles/PuzzleControls.module.css';

const PuzzleControls: React.FC = () => {
  const puzzleNumbers = getPuzzleNumbers();
  // const puzzleNumbers = getTestPuzzleNumbers(); // testPuzzles for easier debug
  const { puzzleNumber } = useSelector((state: RootState) => state.gameSettings);
  const { status } = useSelector((state: RootState) => state.timer);
  const dispatch = useDispatch();

  const handleChangePuzzle = (nextOne: boolean) => {
    const plus = nextOne ? 1 : -1;
    const index = puzzleNumbers.findIndex((num) => num === puzzleNumber);
    const newIndex = (index + plus + puzzleNumbers.length) % puzzleNumbers.length;
    dispatch(setPuzzleNumber(puzzleNumbers[newIndex]!));
  };

  return (
    <div className={styles.puzzleControls}>
      <button disabled={status === 'loading'} onClick={() => handleChangePuzzle(false)}>◀</button>
      <PuzzleSelector />
      <button disabled={status === 'loading'} onClick={() => handleChangePuzzle(true)}>▶</button>
    </div>
  );
};

export default PuzzleControls;
