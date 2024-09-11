import type { RootState } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { setLatestClick } from '../state/slices/boardSlice';
import { useEffect, useState } from 'react';
import Cell, { type CurrDisplayType } from '../models/cellModel';

import styles from '../styles/GameCell.module.css';

interface GameCellProps {
  cellInstance: Cell;
}

const GameCell: React.FC<GameCellProps> = ({ cellInstance }) => {
  const { clearBoardCount, latestClick } = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();

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
    dispatch(setLatestClick({
      row: cellInstance.row,
      col: cellInstance.col,
      colorIndex: cellInstance.colorIndex,
      display: cellInstance.currDisplay,
    }));
  };

  useEffect(() => {
    cellInstance.reset();
  }, [clearBoardCount]);

  useEffect(() => {
    if (!latestClick) {
      return;
    }
    if (cellInstance.isAffectedBy(latestClick)) {
      cellInstance.autoSetCurrDisplay(latestClick);
    }
  }, [latestClick]);

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
