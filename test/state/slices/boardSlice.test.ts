import reducer, { type BoardState, clearBoard, setLatestClick, addToQueenArr, removeFromQueenArr, setWrongCells } from '../../../src/state/slices/boardSlice';

describe('boardSlice', () => {
  let initialState: BoardState;
  beforeEach(() => {
    initialState = {
      clearBoardCount: 0,
      latestClick: null,
      queenArr: [],
      wrongCells: [],
    };
  });

  test('should return boardSlice initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('clearBoard action', () => {
    expect(reducer(initialState, clearBoard())).toEqual({
      clearBoardCount: 1,
      latestClick: null,
      queenArr: [],
      wrongCells: [],
    });
  });

  test('setLatestClick action', () => {
    expect(reducer(initialState, setLatestClick({ row: 1, col: 1, colorIndex: 2, display: 'X' }))).toEqual({
      clearBoardCount: 0,
      latestClick: { row: 1, col: 1, colorIndex: 2, display: 'X' },
      queenArr: [],
      wrongCells: [],
    });
  });

  test('addToQueenArr action', () => {
    expect(reducer(initialState, addToQueenArr({ row: 1, col: 1, colorIndex: 2 }))).toEqual({
      clearBoardCount: 0,
      latestClick: null,
      queenArr: [{ row: 1, col: 1, colorIndex: 2 }],
      wrongCells: [],
    });
  });

  test('removeFromQueenArr action', () => {
    const previousState: BoardState = {
      clearBoardCount: 0,
      latestClick: null,
      queenArr: [{ row: 1, col: 1, colorIndex: 2 }, { row: 1, col: 2, colorIndex: 2 }],
      wrongCells: [],
    };
    expect(reducer(previousState, removeFromQueenArr({ row: 1, col: 1, colorIndex: 2 }))).toEqual({
      clearBoardCount: 0,
      latestClick: null,
      queenArr: [{ row: 1, col: 2, colorIndex: 2 }],
      wrongCells: [],
    });
  });

  test('setWrongCells action', () => {
    expect(reducer(initialState, setWrongCells([{ row: 1, col: 1, colorIndex: 2 }]))).toEqual({
      clearBoardCount: 0,
      latestClick: null,
      queenArr: [],
      wrongCells: [{ row: 1, col: 1, colorIndex: 2 }],
    });
  });
});
