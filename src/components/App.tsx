import styles from '../styles/App.module.css';
import Timer from './Timer';
import GameRule from './GameRule';

const App: React.FC = () => {
  return (
    <div data-testid="app-testid" className={styles.app}>
      <Timer />
      <GameRule />
    </div>
  );
};

export default App;
