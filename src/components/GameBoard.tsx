import styles from '../styles/GameBoard.module.css';

interface GameBoardProps {
  n: number;
  isPaused: boolean;
  setIsPaused: (isPaused: boolean) => void;
}

interface GameCell {
  id: string;
  row: number;
  col: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ n, isPaused, setIsPaused }) => {
  const rows: GameCell[][] = [];

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

  return (
    <div className={styles.gameBoard}>
      {isPaused &&
        <div className={styles.pausedGameBoard}>
          <button onClick={() => setIsPaused(false)}>Continue</button>
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
