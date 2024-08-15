import type { RootState } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { setIsPaused, setNeedReset } from '../state/slices/timerSlice';

import styles from '../styles/GameBoard.module.css';

interface GameBoardProps {
  n: number;
}

interface GameCell {
  id: string;
  row: number;
  col: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ n }) => {
  const rows: GameCell[][] = [];
  const { isPaused } = useSelector((state: RootState) => state.timer);
  const dispatch = useDispatch();

  for (let i = 0; i < n; i++) {
    rows[i] = [];
    for (let j = 0; j < n; j++) {
      const cell = {
        id: `${i + 1}-${j + 1}`,
        row: i + 1,
        col: j + 1
      }
      rows[i]!.push(cell);
    }
  }

  const continueClicked = () => {
    dispatch(setIsPaused(false));
  };

  const newGameClicked = () => {
    dispatch(setNeedReset(true));
  };

  return (
    <div className={styles.gameBoard}>
      {isPaused &&
        <div className={styles.pausedGameBoard}>
          <button onClick={continueClicked}>Continue</button>
          <button onClick={newGameClicked}>New Game</button>
        </div>
      }
      {rows.map((row, i) => {
        return (
          <div key={'row' + (i + 1)} className={styles.gameBoardRow}>
            {row.map(cell => {
              return (
                <div key={cell.id} className={styles.gameCell}>
                  row: {cell.row}, col: {cell.col}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  );
}

export default GameBoard;
