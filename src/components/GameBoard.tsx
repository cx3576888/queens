import type { RootState } from '../state/store';
import { useSelector } from 'react-redux';
import PauseOverlay from './PauseOverlay';
import GameCell, { type GameCellProps } from './GameCell';

import styles from '../styles/GameBoard.module.css';

interface GameBoardProps {
  n: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ n }) => {
  const rows: GameCellProps[][] = [];
  const { isPaused } = useSelector((state: RootState) => state.timer);

  for (let i = 0; i < n; i++) {
    rows[i] = [];
    for (let j = 0; j < n; j++) {
      const cell = {
        id: `${i + 1}-${j + 1}`,
        row: i + 1,
        col: j + 1,
        firstRow: i === 0
      }
      rows[i]!.push(cell);
    }
  }

  return (
    <div className={styles.gameBoard}>
      {isPaused && <PauseOverlay />}
      {rows.map((row, i) => {
        return (
          <div key={'row' + (i + 1)} className={styles.gameBoardRow}>
            {row.map(cell => {
              return <GameCell key={cell.id} {...cell} />
            })}
          </div>
        )
      })}
    </div>
  );
};

export default GameBoard;
