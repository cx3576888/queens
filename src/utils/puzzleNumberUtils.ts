export const latestPuzzleNumber = 127;

export const getPuzzleNumbers = (latestPuzzleNumber: number) => {
  const puzzleNumbers = [53, 66];
  for (let i = 68; i <= latestPuzzleNumber; i++) {
    puzzleNumbers.push(i);
  }
  return puzzleNumbers;
};
