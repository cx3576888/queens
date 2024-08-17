import { useDispatch } from 'react-redux';
import { setIsPaused, setNeedReset } from '../state/slices/timerSlice';

import styles from '../styles/PauseOverlay.module.css';

const PauseOverlay: React.FC = () => {
  const dispatch = useDispatch();

  const handleContinue = () => {
    dispatch(setIsPaused(false));
  };

  const handleNewGame = () => {
    dispatch(setNeedReset(true));
  };

  return (
    <div className={styles.pauseOverlay}>
      <button onClick={handleContinue}>Continue</button>
      <button onClick={handleNewGame}>New Game</button>
    </div>
  );
};

export default PauseOverlay;
