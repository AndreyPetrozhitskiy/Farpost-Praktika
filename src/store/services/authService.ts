// services/authService.ts
import axios from "axios";
import { API_BASE_URL } from "../../../config";

export const authenticate = async (login: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/task/user/auth`, {
    login,
    password,
  });
  return response.data;
};

export const register = async (login: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/task/user/registration`, {
    login,
    password,
  });
  return response.data;
};

export const checkToken = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_BASE_URL}/task/user/check`, config);
  return response.data;
};
