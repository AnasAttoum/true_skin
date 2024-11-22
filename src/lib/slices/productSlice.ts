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
      const newState = state.filter((product) => {
        return product.id !== action.payload;
      });
      localStorage.setItem("products", JSON.stringify(newState));
      return newState;
    },
    addProduct: (
      state,
      action: PayloadAction<{name: string;price: number;stock: number;image: string;description: string;}>
    ) => {
      // console.log(state[state.length].id+1);
      let newId=0;
      state.forEach((product)=>{
        if(product.id>newId)
          newId = product.id+1
      })
      state.unshift({id:newId,...action.payload});
      localStorage.setItem("products", JSON.stringify(state));
    },
  },
});

// Action creators are generated for each case reducer function
export const { initProducts, deleteProduct, addProduct } = productSlice.actions;

export default productSlice.reducer;
