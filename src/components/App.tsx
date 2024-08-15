import styles from '../styles/App.module.css';
import { useDispatch } from 'react-redux';
import { setIsPaused } from '../state/slices/timerSlice';
import Timer from './Timer';
import GameBoard from './GameBoard';
import GameRule from './GameRule';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const pauseClicked = () => {
    dispatch(setIsPaused(true));
  };

  return (
    <div data-testid="app-testid" className={styles.app}>
      <Timer />
      <GameBoard n={6} />
      {<button onClick={pauseClicked}>Pause</button>}
      <GameRule />
    </div>
  );
};

export default App;
