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

  const className = styles.gameCell + (cellInstance.row === 1 ? ` ${styles.firstRow} ` : ' ') + styles[`gameCellColor${cellInstance.colorIndex}`];

  const handleCellClick = () => () => {
    cellInstance.toggleCurrDisplay();
  };

  const display = () => {
    switch (cellInstance.currDisplay) {
      case 'empty':
        return '';
      case 'X':
        return '✖︎';
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
