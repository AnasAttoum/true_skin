import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./slices/cartSlice";
import userSlice from "./slices/userSlice";
import productSlice from "./slices/productSlice";
import orderSlice from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    user: userSlice,
    product: productSlice,
    order: orderSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
