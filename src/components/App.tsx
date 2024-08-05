import styles from '../styles/App.module.css';
import GameRule from './GameRule';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <GameRule />
    </div>
  );
};

export default App;
