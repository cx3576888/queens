import { getPuzzleNumbers, getTestPuzzleNumbers, latestPuzzleNumber, numberOfTestPuzzles } from '../../src/utils/puzzleNumberUtils';

describe('puzzleNumberUtils', () => {
  test('getPuzzleNumbers', () => {
    expect(getPuzzleNumbers()).toEqual(expect.arrayContaining([latestPuzzleNumber]));
  });

  test('getTestPuzzleNumbers', () => {
    const result = getTestPuzzleNumbers();
    expect(result.length).toBe(numberOfTestPuzzles);
    expect(result).toEqual([1, 2]);
  });
});
