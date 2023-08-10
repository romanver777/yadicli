import { createSlice } from "@reduxjs/toolkit";

interface IAuth {
  auth: boolean;
}

const initialState: IAuth = {
  auth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state) => {
      state.auth = true;
    },
    removeAuth: (state) => {
      state.auth = false;
    },
  },
});

export const { setAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;
