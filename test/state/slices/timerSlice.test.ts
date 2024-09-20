import reducer, { type TimerState, setStatus } from '../../../src/state/slices/timerSlice';

describe('timerSlice', () => {
  let initialState: TimerState;
  beforeEach(() => {
    initialState = {
      status: 'loading',
    };
  });

  test('should return timerSlice initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('setIsPaused action', () => {
    expect(reducer(initialState, setStatus('paused'))).toEqual({
      status: 'paused'
    });
  });
});
