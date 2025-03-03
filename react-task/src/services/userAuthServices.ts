import {
  loginApiData,
  registerApiData,
} from "../data/model/types/axiosApiCall/axiosApiDataTypes";
import { axiosConstants } from "../utils/constants/app.constants";
import apiClient from "./apiClient";

export const loginAPI = async (data: loginApiData) => {
  try {
    const response = await apiClient.post(axiosConstants.loginPath, data);
    if (response.status !== 200) {
      throw new Error(
        response.data.message || "Login failed. Please try again."
      );
    }

    return response;
  } catch (error: any) {
    throw error.response?.data?.message
      ? new Error(error.response.data.message)
      : new Error("Something went wrong during login.");
  }
};

export const registerAPI = async (data: registerApiData) => {
  try {
    const response = await apiClient.post(axiosConstants.registerPath, data);

    if (response.status !== 201) {
      throw new Error(response.data.message || "Registration failed.");
    }

    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message
      ? new Error(error.response.data.message)
      : new Error("Something went wrong during registration.");
  }
};
