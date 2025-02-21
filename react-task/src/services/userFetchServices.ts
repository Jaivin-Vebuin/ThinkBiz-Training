import { axiosConstants } from "../utils/constants/app.constants";
import apiClient from "./apiClient";


export const getUserAPI = async () => {
    try {
      const response = await apiClient.get("/");
     
      return response;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  // for admin only
  export const getAllUserAPI = async () => {
    try {
      const response = await apiClient.get(axiosConstants.getUserData + axiosConstants.getAllQuery);
    
      return response;
    } catch (error) {
      console.error('Error fetching all user data:', error);
    }
  };