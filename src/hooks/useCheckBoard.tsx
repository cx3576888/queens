import type { RootState } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { setWrongCells } from '../state/slices/boardSlice';
import { useEffect } from 'react';
import { getAffectedCellGroups, getNumberOfQueens } from '../utils/boardUtils';
import Cell from '../models/cellModel';
import type { PuzzleCellType } from '../../scripts/download_puzzle';

export const useCheckBoard = (puzzle: Cell[][]) => {
  const { queenArr } = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();

  useEffect(() => {
    const wrongCells: PuzzleCellType[] = [];
    queenArr.forEach((queen) => {
      const groups = getAffectedCellGroups(puzzle, queen);
      Object.values(groups).forEach((group) => {
        if (getNumberOfQueens(group) > 1) {
          group.forEach((cell) => {
            wrongCells.push({ row: cell.row, col: cell.col, colorIndex: cell.colorIndex });
          });
        }
      });
    });
    dispatch(setWrongCells(wrongCells));
  }, [queenArr]);
};
