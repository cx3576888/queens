import styles from '../styles/App.module.css';
import { usePuzzleNumber } from '../hooks/usePuzzleNumber';
import { puzzleNumbers } from '../utils/puzzleUtils';
import { RedirectToHome } from '../routes/RedirectToHome';
import Header from './Header';
import TopBar from './TopBar';
import GameBoard from './GameBoard';
import PuzzleControls from './PuzzleControls';
import GameRule from './GameRule';

const App: React.FC = () => {
  const { puzzleNumber, needRedirect } = usePuzzleNumber();
  if (needRedirect) {
    return <RedirectToHome />;
  }
  if (!puzzleNumbers.includes(puzzleNumber)) {
    // no this puzzle
    return <RedirectToHome />;
  }
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
