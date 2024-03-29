import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { removeToken } from "../utils/storage";

interface AuthState {
  isAuthenticated: boolean;
  userName: string | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userName: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { userName, token },
      }: PayloadAction<{ userName: string; token: string }>
    ) => {
      state.isAuthenticated = true;
      state.userName = userName;
      state.token = token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userName = null;
      state.token = null;
      removeToken();
    },
    verifySuccess: (
      state,
      { payload: { userName } }: PayloadAction<{ userName: string }>
    ) => {
      state.userName = userName;
      state.isAuthenticated = true;
    },
  },
});

export const { setCredentials, logout, verifySuccess } = authSlice.actions;

export default authSlice.reducer;
