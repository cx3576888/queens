import type { RootState } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { setStatus } from '../state/slices/timerSlice';

import styles from '../styles/PauseOverlay.module.css';

const PauseOverlay: React.FC = () => {
  const { status } = useSelector((state: RootState) => state.timer);
  const dispatch = useDispatch();

  const handleContinue = () => {
    dispatch(setStatus('running'));
  };

  const display = () => {
    switch (status) {
      case 'loading':
        return (
          <div className={styles.pauseOverlay}>
            <div className={styles.overlayText}>Loading
              <span className={styles.loadingDot}>.</span><span className={styles.loadingDot}>.</span><span className={styles.loadingDot}>.</span>
            </div>
          </div>
        );
      case 'loadError':
        return (
          <div className={styles.pauseOverlay}>
            <div className={styles.overlayText}>Load Error!</div>
          </div>
        );
      case 'loadSuccess':
      case 'paused':
        return (
          <div className={styles.pauseOverlay}>
            <button onClick={handleContinue}>{status === 'loadSuccess' ? 'Start' : 'Continue'}</button>
          </div>
        );
      case 'running':
      case 'win':
        return (
          <div></div>
        );
    }
  };

  return display();
};

export default PauseOverlay;
