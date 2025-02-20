import { axiosConstants } from "../utils/constants/app.constants";
import apiClient from "./apiClient";

export const loginAPI = async (data:{email:string, password:string})=>{
    const response = await apiClient.post(axiosConstants.loginPath,data);
    return response;
};

export const registerAPI = async (data:{name:string,email:string,password:string,role:string,age:number}) => {
    const response = await apiClient.post(axiosConstants.registerPath,data);
    return response.data;
}