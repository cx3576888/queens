import styles from '../styles/App.module.css';
import Header from './Header';
import TopBar from './TopBar';
import GameBoard from './GameBoard';
import PuzzleControls from './PuzzleControls';
import GameRule from './GameRule';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <TopBar />
        <GameBoard />
        <PuzzleControls />
        <GameRule />
      </main>
    </>
  );
};

export default App;
