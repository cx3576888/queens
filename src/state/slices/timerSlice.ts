import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type StatusType = 'loading' | 'loadError' | 'loadSuccess' | 'paused' | 'running' | 'win';

export interface TimerState {
  status: StatusType;
};

const initialState: TimerState = {
  status: 'loading',
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<StatusType>) => {
      state.status = action.payload;
    }
  }
});

export const { setStatus } = timerSlice.actions;
export default timerSlice.reducer;
