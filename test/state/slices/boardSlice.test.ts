import reducer, { setLatestClick, clearBoard, type BoardState } from '../../../src/state/slices/boardSlice';

test('should return boardSlice initial state', () => {
  expect(reducer(undefined, { type: 'unknown' })).toEqual({
    latestClick: null,
    clearBoardCount: 0
  });
});

test('setLatestClick should change latestClick state', () => {
  const previousState: BoardState = { latestClick: null, clearBoardCount: 0 };
  expect(reducer(previousState, setLatestClick({ row: 1, col: 1, colorIndex: 2, display: 'X' }))).toEqual({
    latestClick: { row: 1, col: 1, colorIndex: 2, display: 'X' },
    clearBoardCount: 0
  });
});

test('clearBoard should change clearBoardCount state', () => {
  const previousState: BoardState = { latestClick: null, clearBoardCount: 0 };
  expect(reducer(previousState, clearBoard())).toEqual({
    latestClick: null,
    clearBoardCount: 1
  });
});
