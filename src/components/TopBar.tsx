import type { RootState } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { clearBoard } from '../state/slices/boardSlice';
import { setStatus } from '../state/slices/timerSlice';
import SettingsDropdown from './SettingsDropdown';
import Timer from './Timer';

import styles from '../styles/TopBar.module.css';

const TopBar: React.FC = () => {
  const { status } = useSelector((state: RootState) => state.timer);
  const dispatch = useDispatch();

  const handlePause = () => {
    dispatch(setStatus('paused'));
  };

  const handleClearBoard = () => {
    dispatch(clearBoard());
  };

  return (
    <div className={styles.topBar}>
      <div className={styles.topBarLeft}>
        <SettingsDropdown />
        <button disabled={status !== 'running'} onClick={handlePause}>Pause</button>
      </div>
      <Timer />
      <button disabled={status !== 'running'} onClick={handleClearBoard}>Clear Board</button>
    </div>
  );
};

export default TopBar;
