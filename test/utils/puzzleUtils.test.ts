import { getGrayPuzzleJson, getNewPuzzleNumber, getTestPuzzleNumbers, latestPuzzleNumber, numberOfTestPuzzles, puzzleNumbers } from '../../src/utils/puzzleUtils';

describe('puzzleUtils', () => {
  test('getPuzzleNumbers', () => {
    expect(puzzleNumbers[0]).toBe(latestPuzzleNumber);
  });

  describe('getNewPuzzleNumber', () => {
    test('older of 100', () => {
      expect(getNewPuzzleNumber(100, true)).toBe(99);
    });
    test('newer of 100', () => {
      expect(getNewPuzzleNumber(100, false)).toBe(101);
    });
    test('older of 66', () => {
      expect(getNewPuzzleNumber(66, true)).toBe(53);
    });
    test('newer of 66', () => {
      expect(getNewPuzzleNumber(66, false)).toBe(68);
    });
    test('older of last element', () => {
      expect(getNewPuzzleNumber(53, true)).toBe(latestPuzzleNumber);
    });
    test('newer of first element', () => {
      expect(getNewPuzzleNumber(latestPuzzleNumber, false)).toBe(53);
    });
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
