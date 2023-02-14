import axios from "axios";
// import router from '@/router'
import config from "../config";

const mascotasApi = axios.create({
    baseURL: config.backend_url,
});

// Request interceptors for API calls
mascotasApi.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        config.headers.Authorization = `Bearer ${user ? user.token : ''}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// mascotasApi.interceptors.response.use(
//     response => {
//         return response;
//     },
//     error => {
//         if (error.response?.status == 401) {
//             localStorage.clear()
//             router.push({ name: 'signin' })
//             window.history.go()
//         }
//         return Promise.reject(error);
//     }
// );

export default mascotasApi;