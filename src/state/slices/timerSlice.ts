import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface TimerState {
  isPaused: boolean;
  needReset: boolean;
};

const initialState: TimerState = {
  isPaused: true,
  needReset: false,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setIsPaused: (state, action: PayloadAction<boolean>) => {
      state.isPaused = action.payload;
    },
    setNeedReset: (state, action: PayloadAction<boolean>) => {
      state.needReset = action.payload;
    }
  }
});

export const { setIsPaused, setNeedReset } = timerSlice.actions;
export default timerSlice.reducer;
