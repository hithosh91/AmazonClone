// Globalstore/Store.ts
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./ProductSlice";
import userReducer from "./Userdetails";
import searchReducer from "./Searchslice";
import cartReducer from "./Cartslice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    search: searchReducer, // Add search reducer
    cart: cartReducer, // Add cart reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
