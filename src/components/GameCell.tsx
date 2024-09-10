import { useState } from 'react';
import Cell, { type CurrDisplayType } from '../models/cellModel';

import styles from '../styles/GameCell.module.css';

interface GameCellProps {
  cellInstance: Cell;
}

const GameCell: React.FC<GameCellProps> = ({ cellInstance }) => {
  const [, setCurrDisplay] = useState<CurrDisplayType>('empty');
  const [, setIsWrong] = useState<boolean>(false);
  cellInstance.prepareReactStateFns({ setCurrDisplay, setIsWrong });

  const className =
    styles.gameCell
    + ' '
    + styles[`gameCellColor${cellInstance.colorIndex}`]
    + (cellInstance.row === 1 ? ` ${styles.wideBorderTop}` : '')
    + (cellInstance.bordersMark.right !== 'sameColor' ? ` ${styles.wideBorderRight}` : '')
    + (cellInstance.bordersMark.bottom !== 'sameColor' ? ` ${styles.wideBorderBottom}` : '')
    + (cellInstance.isWrong ? ` ${styles.gameCellWrong}` : '');

  const handleCellClick = () => () => {
    cellInstance.toggleCurrDisplay();
  };

  const display = () => {
    switch (cellInstance.currDisplay) {
      case 'empty':
        return '';
      case 'X':
        return '×';
      case 'queen':
        return '♛';
    }
  };

  return (
    <div className={className} onClick={handleCellClick()}>
      {display()}
    </div>
  );
};

export default GameCell;
