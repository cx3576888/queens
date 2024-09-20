import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { latestPuzzleNumber } from '../../utils/puzzleUtils';

export interface GameSettingsState {
  puzzleNumber: number;
}

const initialState: GameSettingsState = {
  puzzleNumber: latestPuzzleNumber
};

const gameSettingsSlice = createSlice({
  name: 'gameSettings',
  initialState,
  reducers: {
    setPuzzleNumber: (state, action: PayloadAction<number>) => {
      state.puzzleNumber = action.payload;
    }
  }
});

export const { setPuzzleNumber } = gameSettingsSlice.actions;
export default gameSettingsSlice.reducer;
