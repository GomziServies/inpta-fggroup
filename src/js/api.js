import axios from 'axios';
import apiConfig from './apiConfig';

const axiosInstance = axios.create({
    baseURL: apiConfig.BASE_URL + '/user/v1',
});

axiosInstance.interceptors.request.use(
    (config) => {
        const authorization = localStorage.getItem('authorization');

        if (authorization) {
            config.headers['authorization'] = authorization;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default axiosInstance;

// Additional code to create a separate instance for business-listing
export const businessListingAxiosInstance = axios.create({
    baseURL: apiConfig.BASE_URL + '/business-listing',
});

businessListingAxiosInstance.interceptors.request.use(
    (config) => {
        const authorization = localStorage.getItem('authorization');

        if (authorization) {
            config.headers['authorization'] = authorization;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);
