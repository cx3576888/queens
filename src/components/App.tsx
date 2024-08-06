import styles from '../styles/App.module.css';
import Timer from './Timer';
import GameBoard from './GameBoard';
import GameRule from './GameRule';

const App: React.FC = () => {
  return (
    <div data-testid="app-testid" className={styles.app}>
      <Timer />
      <GameBoard n={6} />
      <GameRule />
    </div>
  );
};

export default App;
