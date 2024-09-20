import reducer, { type GameSettingsState, setPuzzleNumber } from '../../../src/state/slices/gameSettingsSlice';
import { latestPuzzleNumber } from '../../../src/utils/puzzleUtils';

describe('gameSettingsSlice', () => {
  let initialState: GameSettingsState;
  beforeEach(() => {
    initialState = {
      puzzleNumber: latestPuzzleNumber
    };
  });

  test('should return gameSettingsSlice initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('setPuzzleNumber action', () => {
    expect(reducer(initialState, setPuzzleNumber(123))).toEqual({
      puzzleNumber: 123
    });
  });
});
