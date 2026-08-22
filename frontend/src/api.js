import axios from 'axios';
import { ACCESS_TOKEN } from './constants';

const apiUrl = "https://70515d54-d523-4764-b847-412fa03266d6-dev.e1-us-east-azure.choreoapis.dev/react-django-project/backend/v1"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl // backend url
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);

        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api