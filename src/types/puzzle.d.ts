declare global {
  type PuzzleCellType = {
    row: number;
    col: number;
    colorIndex: number;
  };

  type PuzzleJsonType = {
    queens: PuzzleCellType[][];
  };
}

export { };
