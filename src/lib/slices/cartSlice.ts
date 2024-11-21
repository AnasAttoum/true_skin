import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface cart {
  id: number;
  quantity: number;
}

const initialState: cart[] = []

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initCart: (_state, action: PayloadAction<cart[]>) => {
      return action.payload;
    },
    addToCart: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      if (
        state.find((element) => {
          return element.id === action.payload.id;
        })
      ) {
        state.map((el) => {
          if (el.id === action.payload.id)
            return (el.quantity += action.payload.quantity);
          else return el;
        });
      } else {
        state.push({
          id: action.payload.id,
          quantity: action.payload.quantity,
        });
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    deleteFromCart: (state, action: PayloadAction<number>) => {
      const newCart = state.filter((element)=>{
        return element.id!==action.payload
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    },
  },
});

// Action creators are generated for each case reducer function
export const { initCart, addToCart, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;
