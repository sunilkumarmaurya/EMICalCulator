import { configureStore } from '@reduxjs/toolkit';

import emiReducer from './emiSlice';

export const store = configureStore({
  reducer: {
    emi: emiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
