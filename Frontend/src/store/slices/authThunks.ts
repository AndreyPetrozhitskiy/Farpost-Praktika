import { createAsyncThunk } from "@reduxjs/toolkit";
import { authenticate, register, checkToken } from "../services/authService";
import { saveToken } from "../utils/storage";
export const login = createAsyncThunk(
  "auth/login",
  async ({ login, password }: { login: string; password: string }) => {
    const response = await authenticate(login, password);

    if (response.Token) {
      saveToken(response.Token);
      return { userName: response.Name, token: response.Token };
    } else {
      console.log("Токен отсутствует в ответе");
    }
    return response;
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ login, password }: { login: string; password: string }) => {
    const response = await register(login, password);
    if (response.Token) {
      saveToken(response.Token);
      return { userName: response.Name, token: response.Token };
    }
    return response;
  }
);

export const verifyToken = createAsyncThunk(
  "auth/verifyToken",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await checkToken(token);
      if (response.Success) {
        return { Name: response.Name };
      }
    } catch (error) {
      return rejectWithValue("An unknown error occurred");
    }
  }
);
