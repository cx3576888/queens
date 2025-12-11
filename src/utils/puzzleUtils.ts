import Cell from '../models/cellModel';

export const latestPuzzleNumber = 590;
export const numberOfTestPuzzles = 2;
export const puzzleNumbers = getPuzzleNumbers();
const firstElement = puzzleNumbers[0]!;
const lastElement = puzzleNumbers[puzzleNumbers.length - 1]!;

function getPuzzleNumbers() {
  const puzzleNumbers = [];
  for (let i = latestPuzzleNumber; i >= 68; i--) {
    puzzleNumbers.push(i);
  }
  puzzleNumbers.push(66, 53);
  return puzzleNumbers;
};

export const getNewPuzzleNumber = (puzzleNumber: number, older: boolean) => {
  let newPuzzleNumber = puzzleNumber;
  let found = false;
  while (!found) {
    if (older) {
      newPuzzleNumber -= 1;
      if (newPuzzleNumber < lastElement) {
        newPuzzleNumber = firstElement;
      }
    } else {
      newPuzzleNumber += 1;
      if (newPuzzleNumber > firstElement) {
        newPuzzleNumber = lastElement;
      }
    }
    found = puzzleNumbers.includes(newPuzzleNumber);
  }
  return newPuzzleNumber + "";
};

export const getTestPuzzleNumbers = () => {
  return Array.from({ length: numberOfTestPuzzles }, (_, i) => i + 1);
};

export const getGrayPuzzleJson = (n: number) => {
  const res: PuzzleJsonType = { queens: [] };
  for (let i = 1; i <= n; i++) {
    res.queens.push([]);
    for (let j = 1; j <= n; j++) {
      res.queens[i - 1]!.push({ row: i, col: j, colorIndex: 5 });
    }
  }
  return res;
};

export const initNewPuzzle = (data: PuzzleJsonType) => {
  const newPuzzle = data.queens.map((row) => {
    return row.map((cell) => {
      return new Cell(cell.row, cell.col, cell.colorIndex);
    });
  });
  for (let i = 0; i < newPuzzle.length; i++) {
    for (let j = 0; j < newPuzzle[i]!.length; j++) {
      newPuzzle[i]![j]!.prepareBordersMark(newPuzzle[i - 1]?.[j], newPuzzle[i]![j + 1], newPuzzle[i + 1]?.[j], newPuzzle[i]![j - 1]);
    }
  }
  return newPuzzle;
};

/**
 * Get an n*n all gray puzzle as placeholder
 */
export const initPlaceholderPuzzle = (n: number) => {
  const data = getGrayPuzzleJson(n);
  return initNewPuzzle(data);
};
