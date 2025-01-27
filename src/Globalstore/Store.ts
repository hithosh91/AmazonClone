// Globalstore/Store.ts
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./ProductSlice";
import userReducer from "./Userdetails";
import searchReducer from "./Searchslice"; // Import the search slice

export const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    search: searchReducer, // Add search reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
