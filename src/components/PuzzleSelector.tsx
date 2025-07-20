import { useNavigate } from 'react-router';
import { usePuzzleNumber } from '../hooks/usePuzzleNumber';
import { puzzleNumbers } from '../utils/puzzleUtils';

import styles from '../styles/PuzzleSelector.module.css';

const PuzzleSelector: React.FC = () => {
  const navigate = useNavigate();
  const { puzzleNumber } = usePuzzleNumber();

  const handleSelectPuzzle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPuzzleNumber = event.target.value;
    navigate(newPuzzleNumber);
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
