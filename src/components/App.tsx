import styles from '../styles/App.module.css';
import TopBar from './TopBar';
import GameBoard from './GameBoard';
import PuzzleControls from './PuzzleControls';
import GameRule from './GameRule';

const App: React.FC = () => {
  return (
    <div data-testid="app-testid" className={styles.app}>
      <TopBar />
      <GameBoard />
      <PuzzleControls />
      <GameRule />
    </div>
  );
};

export default App;
