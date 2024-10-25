import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IBrand, IBrandStoreItem } from "../../types/brand.type";

export interface BrandListState {
  list: IBrandStoreItem[];
  searchValue: string;
}

const initialState: BrandListState = {
  list: [],
  searchValue: "",
};

export const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    check: (state, action: PayloadAction<number>) => {
      state.list = state.list.map((el) => {
        if (el.id === action.payload) {
          return { ...el, checked: true };
        }
        return el;
      });
    },
    uncheck: (state, action: PayloadAction<number>) => {
      state.list = state.list.map((el) => {
        if (el.id === action.payload) {
          return { ...el, checked: false };
        }
        return el;
      });
    },
    setBrands: (state, action: PayloadAction<IBrand[]>) => {
      state.list = action.payload.map(
        (el) => ({ ...el, checked: false } as IBrandStoreItem)
      );
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    clearSearchValue: (state) => {
      state.searchValue = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const brandActions = brandSlice.actions;
export const brandReducer = brandSlice.reducer;
