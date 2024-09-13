import reducer, { type BoardState, setN, clearBoard, setLatestClick, addToQueenArr, removeFromQueenArr, setWrongCellsAndCheckWin } from '../../../src/state/slices/boardSlice';

describe('boardSlice', () => {
  let initialState: BoardState;
  beforeEach(() => {
    initialState = {
      n: -1,
      clearBoardCount: 0,
      latestClick: null,
      queenArr: [],
      wrongCells: [],
      isWin: false,
    };
  });

  test('should return boardSlice initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('setN action', () => {
    expect(reducer(initialState, setN(4))).toEqual({
      n: 4,
      clearBoardCount: 0,
      latestClick: null,
      queenArr: [],
      wrongCells: [],
      isWin: false,
    });
  });

  test('clearBoard action', () => {
    const previousState: BoardState = {
      n: 4,
      clearBoardCount: 0,
      latestClick: { row: 1, col: 1, colorIndex: 2, display: 'X' },
      queenArr: [{ row: 1, col: 1, colorIndex: 2 }],
      wrongCells: [{ row: 1, col: 1, colorIndex: 2 }],
      isWin: false,
    };
    expect(reducer(previousState, clearBoard())).toEqual({
      n: 4,
      clearBoardCount: 1,
      latestClick: null,
      queenArr: [],
      wrongCells: [],
      isWin: false,
    });
  });

  test('setLatestClick action', () => {
    expect(reducer(initialState, setLatestClick({ row: 1, col: 2, colorIndex: 1, display: 'queen' }))).toEqual({
      n: -1,
      clearBoardCount: 0,
      latestClick: { row: 1, col: 2, colorIndex: 1, display: 'queen' },
      queenArr: [],
      wrongCells: [],
      isWin: false,
    });
  });

  test('addToQueenArr action', () => {
    expect(reducer(initialState, addToQueenArr({ row: 1, col: 2, colorIndex: 1 }))).toEqual({
      n: -1,
      clearBoardCount: 0,
      latestClick: null,
      queenArr: [{ row: 1, col: 2, colorIndex: 1 }],
      wrongCells: [],
      isWin: false,
    });
  });

  test('removeFromQueenArr action', () => {
    const previousState: BoardState = {
      n: -1,
      clearBoardCount: 0,
      latestClick: null,
      queenArr: [{ row: 1, col: 1, colorIndex: 1 }, { row: 1, col: 2, colorIndex: 1 }],
      wrongCells: [],
      isWin: false,
    };
    expect(reducer(previousState, removeFromQueenArr({ row: 1, col: 1, colorIndex: 1 }))).toEqual({
      n: -1,
      clearBoardCount: 0,
      latestClick: null,
      queenArr: [{ row: 1, col: 2, colorIndex: 1 }],
      wrongCells: [],
      isWin: false,
    });
  });

  describe('setWrongCellsAndCheckWin action', () => {
    test('wrongCells exist', () => {
      expect(reducer(initialState, setWrongCellsAndCheckWin([{ row: 1, col: 1, colorIndex: 1 }]))).toEqual({
        n: -1,
        clearBoardCount: 0,
        latestClick: null,
        queenArr: [],
        wrongCells: [{ row: 1, col: 1, colorIndex: 1 }],
        isWin: false,
      });
    });

    test('wrongCells empty, queen not enough', () => {
      const previousState: BoardState = {
        n: 4,
        clearBoardCount: 0,
        latestClick: null,
        queenArr: [{ row: 1, col: 2, colorIndex: 1 }],
        wrongCells: [{ row: 1, col: 1, colorIndex: 1 }],
        isWin: false,
      };
      expect(reducer(previousState, setWrongCellsAndCheckWin([]))).toEqual({
        n: 4,
        clearBoardCount: 0,
        latestClick: null,
        queenArr: [{ row: 1, col: 2, colorIndex: 1 }],
        wrongCells: [],
        isWin: false,
      });
    });

    test('wrongCells empty, queen enough --> wins!', () => {
      const previousState: BoardState = {
        n: 4,
        clearBoardCount: 0,
        latestClick: null,
        queenArr: [{ row: 1, col: 2, colorIndex: 1 }, { row: 2, col: 4, colorIndex: 2 }, { row: 3, col: 1, colorIndex: 3 }, { row: 4, col: 3, colorIndex: 4 }],
        wrongCells: [{ row: 1, col: 1, colorIndex: 1 }],
        isWin: false,
      };
      expect(reducer(previousState, setWrongCellsAndCheckWin([]))).toEqual({
        n: 4,
        clearBoardCount: 0,
        latestClick: null,
        queenArr: [{ row: 1, col: 2, colorIndex: 1 }, { row: 2, col: 4, colorIndex: 2 }, { row: 3, col: 1, colorIndex: 3 }, { row: 4, col: 3, colorIndex: 4 }],
        wrongCells: [],
        isWin: true,
      });
    });
  });
});
