import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { latestPuzzleNumber } from '../../utils/puzzleUtils';

export interface GameSettingsState {
  puzzleNumber: number;
  enableAutoX: boolean;
  showErrors: boolean;
}

const initialState: GameSettingsState = {
  puzzleNumber: latestPuzzleNumber,
  enableAutoX: true,
  showErrors: true,
};

const gameSettingsSlice = createSlice({
  name: 'gameSettings',
  initialState,
  reducers: {
    setPuzzleNumber: (state, action: PayloadAction<number>) => {
      state.puzzleNumber = action.payload;
    },
    setEnableAutoX: (state, action: PayloadAction<boolean>) => {
      state.enableAutoX = action.payload;
    },
    setShowErrors: (state, action: PayloadAction<boolean>) => {
      state.showErrors = action.payload;
    },
  }
});

export const { setPuzzleNumber, setEnableAutoX, setShowErrors } = gameSettingsSlice.actions;
export default gameSettingsSlice.reducer;
