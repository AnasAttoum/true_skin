import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { product } from "../../constants/types";

const initialState: product[] = [];

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    initProducts: (_state, action: PayloadAction<product[]>) => {
      return [...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { initProducts } = productSlice.actions;

export default productSlice.reducer;
