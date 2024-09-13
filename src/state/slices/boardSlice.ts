import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PuzzleCellWithDisplayType } from '../../models/cellModel';
import type { PuzzleCellType } from '../../../scripts/download_puzzle';


export interface BoardState {
  clearBoardCount: number;
  latestClick: null | PuzzleCellWithDisplayType;
  queenArr: PuzzleCellType[];
  wrongCells: PuzzleCellType[];
}

const initialState: BoardState = {
  clearBoardCount: 0,
  latestClick: null,
  queenArr: [],
  wrongCells: [],
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    clearBoard: (state) => {
      state.clearBoardCount++;
      state.queenArr = [];
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
    setWrongCells: (state, action: PayloadAction<PuzzleCellType[]>) => {
      state.wrongCells = action.payload;
    }
  }
});

export const { clearBoard, setLatestClick, addToQueenArr, removeFromQueenArr, setWrongCells } = boardSlice.actions;
export default boardSlice.reducer;
