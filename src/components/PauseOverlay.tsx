import { useDispatch } from 'react-redux';
import { setIsPaused } from '../state/slices/timerSlice';

import styles from '../styles/PauseOverlay.module.css';

const PauseOverlay: React.FC = () => {
  const dispatch = useDispatch();

  const handleContinue = () => {
    dispatch(setIsPaused(false));
  };

  return (
    <div className={styles.pauseOverlay}>
      <button onClick={handleContinue}>Continue</button>
    </div>
  );
};

export default PauseOverlay;
