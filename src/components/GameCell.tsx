import styles from '../styles/GameCell.module.css';

export interface GameCellProps {
  id: string;
  row: number;
  col: number;
  firstRow: boolean;
}

const GameCell: React.FC<GameCellProps> = (cellInfo) => {
  const className = styles.gameCell + (cellInfo.firstRow ? ` ${styles.firstRow}` : '');
  return (
    <div className={className}>
      row: {cellInfo.row}, col: {cellInfo.col}
    </div>
  );
};

export default GameCell;
