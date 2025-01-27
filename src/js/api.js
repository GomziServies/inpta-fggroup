import axios from "axios";
import apiConfig from "./apiConfig";

const axiosInstance = axios.create({
  baseURL: apiConfig.BASE_URL + "/user/v1",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authorization = localStorage.getItem("authorization");

    if (authorization) {
      config.headers["authorization"] = authorization;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

// Additional code to create a separate instance for inpta-listing
export const inptaListingAxiosInstance = axios.create({
  baseURL: apiConfig.BASE_URL + "/inpta-listing",
});

inptaListingAxiosInstance.interceptors.request.use(
  (config) => {
    const authorization = localStorage.getItem("authorization");

    if (authorization) {
      config.headers["authorization"] = authorization;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const publicAxiosInstance = axios.create({
  baseURL: apiConfig.BASE_URL + "/public/v1",
});

publicAxiosInstance.interceptors.request.use(
  (config) => {
    const authorization = localStorage.getItem("fg_group_user_authorization");

    if (authorization) {
      config.headers["authorization"] = authorization;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
