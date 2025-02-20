import { axiosConstants } from "../utils/constants/app.constants";
import apiClient from "./apiClient";


export const getUserAPI = async () => {
    try {
      const response = await apiClient.get("/");
      console.log("fix user : ",response.data)
      return response;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  // for admin only
  export const getAllUserAPI = async () => {
    try {
      const response = await apiClient.get(axiosConstants.getUserData + axiosConstants.getAllQuery);
      console.log("all data:",response.data)
      return response;
    } catch (error) {
      console.error('Error fetching all user data:', error);
    }
  };