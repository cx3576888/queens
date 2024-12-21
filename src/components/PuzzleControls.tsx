import { useParams, useNavigate } from 'react-router';
import type { RootState } from '../state/store';
import { useSelector } from 'react-redux';

import styles from '../styles/PuzzleControls.module.css';

const PuzzleControls: React.FC = () => {
  const { puzzleNumber } = useParams();
  const navigate = useNavigate();
  const { status } = useSelector((state: RootState) => state.timer);

  const handleChangePuzzle = (olderOne: boolean) => {
    const diff = olderOne ? -1 : 1;
    navigate(`/daily/${+puzzleNumber + diff}`);
  };

  return (
    <div className={styles.puzzleControls}>
      <button disabled={status === 'loading'} onClick={() => handleChangePuzzle(false)}>◀</button>
      Queens #{puzzleNumber}
      <button disabled={status === 'loading'} onClick={() => handleChangePuzzle(true)}>▶</button>
    </div>
  );
};

export default PuzzleControls;
