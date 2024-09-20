import { latestPuzzleNumber, numberOfTestPuzzles, getPuzzleNumbers, getTestPuzzleNumbers, getGrayPuzzleJson } from '../../src/utils/puzzleUtils';

describe('puzzleUtils', () => {
  test('getPuzzleNumbers', () => {
    expect(getPuzzleNumbers()[0]).toBe(latestPuzzleNumber);
  });

  test('getTestPuzzleNumbers', () => {
    const result = getTestPuzzleNumbers();
    expect(result.length).toBe(numberOfTestPuzzles);
    expect(result).toEqual([1, 2]);
  });

  describe('getGrayPuzzleJson', () => {
    test('get 1x1 all gray', () => {
      expect(getGrayPuzzleJson(1)).toEqual({
        queens: [
          [
            { row: 1, col: 1, colorIndex: 5 }
          ]
        ]
      });
    });
    test('get 2x2 all gray', () => {
      expect(getGrayPuzzleJson(2)).toEqual({
        queens: [
          [
            { row: 1, col: 1, colorIndex: 5 },
            { row: 1, col: 2, colorIndex: 5 }
          ],
          [
            { row: 2, col: 1, colorIndex: 5 },
            { row: 2, col: 2, colorIndex: 5 }
          ]
        ]
      });
    });
  });
});
