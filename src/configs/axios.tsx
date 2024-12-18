// api/axiosClient.js
import { notification } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import queryString from "query-string";
import { Navigate } from "react-router-dom";
import { ROUTES_PATH } from "../constants/routers";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // baseURL: "http://localhost:3167/",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  config.headers.Authorization = `Bearer ${Cookies.get("accessToken")}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },

  (error) => {
    if (error && error?.response?.status === 401) {
      Cookies.remove("accessToken");
      notification.error({
        message: "LỖI",
        description: "Xảy ra lỗi khi đăng nhập",
      });
      return <Navigate to={ROUTES_PATH.SIGN_IN} replace />;
    }

    throw error;
  }
);

export default axiosClient;
