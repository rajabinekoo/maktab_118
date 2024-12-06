import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface BankState {
  balance: number;
}

const initialState: BankState = {
  balance: 0,
};

export const bankSlice = createSlice({
  name: "bank",
  initialState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.balance += action.payload;
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.balance -= action.payload;
      if (state.balance < 0) state.balance = 0;
    },
  },
});

export const bankActions = bankSlice.actions;

export default bankSlice.reducer;
