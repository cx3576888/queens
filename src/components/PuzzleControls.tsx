import type { RootState } from '../state/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { usePuzzleNumber } from '../hooks/usePuzzleNumber';
import { getNewPuzzleNumber } from '../utils/puzzleUtils';
import PuzzleSelector from './PuzzleSelector';

import styles from '../styles/PuzzleControls.module.css';

const PuzzleControls: React.FC = () => {
  const navigate = useNavigate();
  const { puzzleNumber } = usePuzzleNumber();
  const { status } = useSelector((state: RootState) => state.timer);

  const handleClickToday = () => {
    navigate("today");
  };

  const handleChangePuzzle = (older: boolean) => {
    const newPuzzleNumber = getNewPuzzleNumber(puzzleNumber, older);
    navigate(newPuzzleNumber);
  };

  return (
    <div className={styles.puzzleControls}>
      <button disabled={status === 'loading'} onClick={handleClickToday}>Today</button>
      <button disabled={status === 'loading'} onClick={() => handleChangePuzzle(false)}>◀</button>
      <PuzzleSelector />
      <button disabled={status === 'loading'} onClick={() => handleChangePuzzle(true)}>▶</button>
    </div>
  );
};

export default PuzzleControls;
