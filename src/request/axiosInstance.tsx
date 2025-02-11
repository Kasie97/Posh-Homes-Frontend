import axios, { InternalAxiosRequestConfig } from "axios";
import { API_ENDPOINT } from '../config';

const axiosInstance = axios.create({
  baseURL: `${API_ENDPOINT}`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => {
    console.log("you got here")
    return Promise.reject(error);
  }
);

export default axiosInstance;