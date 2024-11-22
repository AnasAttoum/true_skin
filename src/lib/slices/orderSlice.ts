import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cart } from "./cartSlice";

export interface order {
  cart: cart[];
  address: string;
  orderNotes: string;
  date: Date
}

const initialState: order[] = []

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    initOrders: (_state, action: PayloadAction<order[]>) => {
      return action.payload;
    },
    addOrder: (state, action: PayloadAction<order>) => {
      state.unshift(action.payload)
      localStorage.setItem("orders", JSON.stringify(state));
    },
  },
});

// Action creators are generated for each case reducer function
export const { initOrders, addOrder } = orderSlice.actions;

export default orderSlice.reducer;
