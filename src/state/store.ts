import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './slices/boardSlice';
import timerReducer from './slices/timerSlice';

const setupStore = () => {
  return configureStore({
    reducer: {
      board: boardReducer,
      timer: timerReducer,
    },
  });
};
const store = setupStore();

export { setupStore, store };
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
