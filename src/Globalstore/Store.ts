// src/Globalstore/Store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Userdetails";
import productReducer from "./ProductSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
