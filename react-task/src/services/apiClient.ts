import axios from "axios";
import { axiosConstants } from "../utils/constants/app.constants";
import store from "../redux/store/store";

const apiClient = axios.create({
  baseURL: axiosConstants.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
    (config) => {
      const state = store.getState();
      const token = state.auth.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

export default apiClient;
