import styles from '../styles/GameCell.module.css';

export interface GameCellProps {
  row: number;
  col: number;
  colorIndex: number;
}

const GameCell: React.FC<GameCellProps> = (cellInfo) => {
  const className = styles.gameCell + (cellInfo.row === 1 ? ` ${styles.firstRow}` : '');
  return (
    <div className={className}>
      color: {cellInfo.colorIndex}
    </div>
  );
};

export default GameCell;
