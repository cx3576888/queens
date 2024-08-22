import type { RootState } from '../state/store';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import PauseOverlay from './PauseOverlay';
import GameCell, { type GameCellProps } from './GameCell';

import styles from '../styles/GameBoard.module.css';

interface GameBoardProps {
  puzzleNumber: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ puzzleNumber }) => {
  const [puzzle, setPuzzle] = useState<GameCellProps[][]>([]);
  const { isPaused } = useSelector((state: RootState) => state.timer);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`puzzles/queens${puzzleNumber}.json`);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const data: { queens: GameCellProps[][]; } = await response.json();
        setPuzzle(data.queens);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [puzzleNumber]);

  return (
    <div className={styles.gameBoard}>
      {isPaused && <PauseOverlay />}
      {puzzle.map((row, i) => {
        return (
          <div key={`row-${i + 1}`} className={styles.gameBoardRow}>
            {row.map(cell => {
              return <GameCell key={`${cell.row}-${cell.col}`} {...cell} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default GameBoard;
