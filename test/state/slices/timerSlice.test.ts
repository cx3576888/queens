import reducer, { setIsPaused, setNeedReset, type TimerState } from '../../../src/state/slices/timerSlice';

test('should return timerSlice initial state', () => {
  expect(reducer(undefined, { type: 'unknown' })).toEqual({
    isPaused: true,
    needReset: false
  });
});

test('setIsPaused should change isPaused state', () => {
  const previousState: TimerState = { isPaused: true, needReset: false };
  expect(reducer(previousState, setIsPaused(false))).toEqual({
    isPaused: false,
    needReset: false
  });
});

test('setNeedReset should change needReset state', () => {
  const previousState: TimerState = { isPaused: true, needReset: false };
  expect(reducer(previousState, setNeedReset(true))).toEqual({
    isPaused: true,
    needReset: true
  });
});
