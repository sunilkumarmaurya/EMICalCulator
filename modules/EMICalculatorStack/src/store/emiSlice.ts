import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EMIResult } from '../types';

interface EMIState {
  lastCalculatedResult: EMIResult | null;
}

const initialState: EMIState = {
  lastCalculatedResult: null,
};

const emiSlice = createSlice({
  name: 'emi',
  initialState,
  reducers: {
    setLastCalculatedResult(state, action: PayloadAction<EMIResult>) {
      state.lastCalculatedResult = action.payload;
    },
    clearLastCalculatedResult(state) {
      state.lastCalculatedResult = null;
    },
  },
});

export const { setLastCalculatedResult, clearLastCalculatedResult } =
  emiSlice.actions;

export default emiSlice.reducer;
