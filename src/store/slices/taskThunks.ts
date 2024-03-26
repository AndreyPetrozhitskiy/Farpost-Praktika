import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetTask } from "../services/taskService";

export const getTask = createAsyncThunk(
  "task/get",
  async ({
    token,
    Data,
  }: {
    token: string;
    Data: {
      page: number;
      priority: string | null;
      sort: string | null;
      tags: string[] | null;
    };
  }) => {
    const response = await GetTask(token, Data);
    return response;
  }
);

// export const signUp = createAsyncThunk('auth/signUp', async ({ login, password }: { login: string; password: string }) => {
//    const response = await register(login, password);
//    if (response.Token) {
//     saveToken(response.Token);
//     return { userName: response.Name, token: response.Token }; // Возвращаем необходимые данные
//   }
//    return response
// });

// export const verifyToken = createAsyncThunk('auth/verifyToken', async (token: string, { rejectWithValue }) => {
//     try {

//       const response = await checkToken(token);
//       console.log(response)
//       if(response.Success){
//         return { Name : response.Name}
//       }

//       // Убедитесь, что данные возвращаются как ожидается
//     } catch (error) {
//       return rejectWithValue('An unknown error occurred');
//     }
//   });
