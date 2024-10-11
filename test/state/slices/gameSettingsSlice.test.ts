import reducer, { type GameSettingsState, setPuzzleNumber, setEnableAutoX, setShowErrors } from '../../../src/state/slices/gameSettingsSlice';
import { latestPuzzleNumber } from '../../../src/utils/puzzleUtils';

describe('gameSettingsSlice', () => {
  let initialState: GameSettingsState;
  beforeEach(() => {
    initialState = {
      puzzleNumber: latestPuzzleNumber,
      enableAutoX: true,
      showErrors: true,
    };
  });

  test('should return gameSettingsSlice initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('setPuzzleNumber action', () => {
    expect(reducer(initialState, setPuzzleNumber(123))).toEqual({
      puzzleNumber: 123,
      enableAutoX: true,
      showErrors: true,
    });
  });

  test('setEnableAutoX action', () => {
    expect(reducer(initialState, setEnableAutoX(false))).toEqual({
      puzzleNumber: latestPuzzleNumber,
      enableAutoX: false,
      showErrors: true,
    });
  });

  test('setShowErrors action', () => {
    expect(reducer(initialState, setShowErrors(false))).toEqual({
      puzzleNumber: latestPuzzleNumber,
      enableAutoX: true,
      showErrors: false,
    });
  });
});
