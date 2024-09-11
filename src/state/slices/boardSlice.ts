import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ClickType } from "../../models/cellModel";

export interface BoardState {
  clearBoardCount: number;
  latestClick: null | ClickType;
}

const initialState: BoardState = {
  clearBoardCount: 0,
  latestClick: null,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    clearBoard: (state) => {
      state.clearBoardCount++;
    },
    setLatestClick: (state, action: PayloadAction<null | ClickType>) => {
      state.latestClick = action.payload;
    }
  }
});

export const { clearBoard, setLatestClick } = boardSlice.actions;
export default boardSlice.reducer;
