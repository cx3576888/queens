export const latestPuzzleNumber = 127;
export const numberOfTestPuzzles = 2;

export const getPuzzleNumbers = () => {
  const puzzleNumbers = [53, 66];
  for (let i = 68; i <= latestPuzzleNumber; i++) {
    puzzleNumbers.push(i);
  }
  return puzzleNumbers;
};

export const getTestPuzzleNumbers = () => {
  return Array.from({ length: numberOfTestPuzzles }, (_, i) => i + 1);
};
