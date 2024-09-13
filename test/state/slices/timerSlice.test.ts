import reducer, { type TimerState, setIsPaused, setNeedReset } from '../../../src/state/slices/timerSlice';

describe('timerSlice', () => {
  let initialState: TimerState;
  beforeEach(() => {
    initialState = {
      isPaused: true,
      needReset: false
    };
  });

  test('should return timerSlice initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('setIsPaused action', () => {
    expect(reducer(initialState, setIsPaused(false))).toEqual({
      isPaused: false,
      needReset: false
    });
  });

  test('setNeedReset action', () => {
    expect(reducer(initialState, setNeedReset(true))).toEqual({
      isPaused: true,
      needReset: true
    });
  });
});
