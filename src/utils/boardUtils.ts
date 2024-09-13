import type { PuzzleCellType } from '../../scripts/download_puzzle';
import type { PuzzleCellWithDisplayType } from '../models/cellModel';
import type Cell from '../models/cellModel';

export const getAffectedCellGroups = (puzzle: Cell[][], givenCell: PuzzleCellType) => {
  const sameRowCells: PuzzleCellWithDisplayType[] = [];
  const sameColCells: PuzzleCellWithDisplayType[] = [];
  const sameColorCells: PuzzleCellWithDisplayType[] = [];
  const neighborCells: PuzzleCellWithDisplayType[] = [];
  puzzle
    .flat(1)
    .forEach((cell) => {
      const puzzleCellWithDisplay = {
        row: cell.row,
        col: cell.col,
        colorIndex: cell.colorIndex,
        display: cell.currDisplay
      };
      if (cell.row === givenCell.row) {
        sameRowCells.push(puzzleCellWithDisplay);
      }
      if (cell.col === givenCell.col) {
        sameColCells.push(puzzleCellWithDisplay);
      }
      if (cell.colorIndex === givenCell.colorIndex) {
        sameColorCells.push(puzzleCellWithDisplay);
      }
      if (cell.isNeighborOf(givenCell)) {
        neighborCells.push(puzzleCellWithDisplay);
      }
    });
  return { sameRowCells, sameColCells, sameColorCells, neighborCells };
};

export const getNumberOfQueens = (group: PuzzleCellWithDisplayType[]) => {
  return group.reduce((acc, curr) => acc + (curr.display === 'queen' ? 1 : 0), 0);
};
