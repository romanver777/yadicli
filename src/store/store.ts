import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import authReducer from "./auth-reducer";
import fetchResoursesReducer from "./fetch-resourses-reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    data: fetchResoursesReducer,
  },
  devTools: process.env.NODE_ENV === "development",
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<TAppDispatch>();
