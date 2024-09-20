import type { RootState } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { addToQueenArr, removeFromQueenArr, setLatestClick } from '../state/slices/boardSlice';
import { useEffect, useState } from 'react';
import Cell, { type CurrDisplayType } from '../models/cellModel';

import styles from '../styles/GameCell.module.css';

interface GameCellProps {
  cellInstance: Cell;
}

const GameCell: React.FC<GameCellProps> = ({ cellInstance }) => {
  const { clearBoardCount, latestClick, wrongCells, isWin } = useSelector((state: RootState) => state.board);
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

  const handleCellClick = () => {
    if (isWin) {
      return;
    }
    cellInstance.toggleCurrDisplay();
    const latestClick = {
      row: cellInstance.row,
      col: cellInstance.col,
      colorIndex: cellInstance.colorIndex,
      display: cellInstance.currDisplay,
    };
    dispatch(setLatestClick(latestClick));
    if (cellInstance.currDisplay === 'queen') {
      dispatch(addToQueenArr(latestClick));
    }
    if (cellInstance.currDisplay === 'empty') {
      dispatch(removeFromQueenArr(latestClick));
    }
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

  useEffect(() => {
    cellInstance.isWrong = cellInstance.isIncludedIn(wrongCells);
  }, [wrongCells]);

  const display = () => {
    switch (cellInstance.currDisplay) {
      case 'empty':
        return <span></span>;
      case 'X':
        return <span>×</span>;
      case 'queen':
        return isWin ?
          <span className={styles.gameCellWin}>♛</span> :
          <span>♛</span>;
    }
  };

  return (
    <div className={className} onClick={handleCellClick}>
      {display()}
    </div>
  );
};

export default GameCell;
