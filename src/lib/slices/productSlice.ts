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
    deleteProduct: (state, action: PayloadAction<number>) => {
      const newState = state.filter((product)=>{
        return product.id!==action.payload
      })
      localStorage.setItem('products', JSON.stringify(newState))
      return newState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { initProducts, deleteProduct } = productSlice.actions;

export default productSlice.reducer;
