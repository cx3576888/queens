import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PuzzleCellWithDisplayType } from '../../models/cellModel';

export interface BoardState {
  n: number;
  clearBoardCount: number;
  latestClick: null | PuzzleCellWithDisplayType;
  queenArr: PuzzleCellType[];
  wrongCells: PuzzleCellType[];
  isWin: boolean;
}

const initialState: BoardState = {
  n: -1,
  clearBoardCount: 0,
  latestClick: null,
  queenArr: [],
  wrongCells: [],
  isWin: false,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setN: (state, action: PayloadAction<number>) => {
      state.n = action.payload;
    },
    clearBoard: (state) => {
      state.clearBoardCount++;
      state.latestClick = null;
      state.queenArr = [];
      state.wrongCells = [];
      state.isWin = false;
    },
    setLatestClick: (state, action: PayloadAction<null | PuzzleCellWithDisplayType>) => {
      state.latestClick = action.payload;
    },
    addToQueenArr: (state, action: PayloadAction<PuzzleCellType>) => {
      state.queenArr.push(action.payload);
    },
    removeFromQueenArr: (state, action: PayloadAction<PuzzleCellType>) => {
      const toRemove = action.payload;
      state.queenArr = state.queenArr.filter((queen) => !(queen.row === toRemove.row && queen.col === toRemove.col));
    },
    setWrongCellsAndCheckWin: (state, action: PayloadAction<PuzzleCellType[]>) => {
      state.wrongCells = action.payload;
      state.isWin = state.wrongCells.length === 0 && state.queenArr.length === state.n;
    }
  }
});

export const { setN, clearBoard, setLatestClick, addToQueenArr, removeFromQueenArr, setWrongCellsAndCheckWin } = boardSlice.actions;
export default boardSlice.reducer;
