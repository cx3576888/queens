import styles from '../styles/App.module.css';
import Timer from './Timer';
import GameBoard from './GameBoard';
import GameRule from './GameRule';
import { useState } from 'react';

const App: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div data-testid="app-testid" className={styles.app}>
      <Timer />
      <GameBoard n={6} isPaused={isPaused} setIsPaused={setIsPaused} />
      {<button onClick={() => setIsPaused(true)}>New Game</button>}
      <GameRule />
    </div>
  );
};

export default App;
