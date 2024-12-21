import styles from '../styles/App.module.css';
import Header from './Header';
import TopBar from './TopBar';
import { Outlet } from 'react-router';
import PuzzleControls from './PuzzleControls';
import GameRule from './GameRule';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <TopBar />
        <Outlet />
        <PuzzleControls />
        <GameRule />
      </main>
    </>
  );
};

export default App;
