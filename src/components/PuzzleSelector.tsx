import type { RootState } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { setPuzzleNumber } from '../state/slices/gameSettingsSlice';
import { getPuzzleNumbers } from '../utils/puzzleUtils';

import styles from '../styles/PuzzleSelector.module.css';

const PuzzleSelector: React.FC = () => {
  const puzzleNumbers = getPuzzleNumbers();
  const { puzzleNumber } = useSelector((state: RootState) => state.gameSettings);
  const dispatch = useDispatch();

  const handleSelectPuzzle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPuzzleNumber(+event.target.value));
  };

  return (
    <div className={styles.puzzleSelector}>
      <span>Queens </span>
      <select
        className={styles.dropdown}
        value={puzzleNumber}
        onChange={handleSelectPuzzle}
      >
        {puzzleNumbers.map((num) => (
          <option key={num} value={num}>
            #{num}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PuzzleSelector;
