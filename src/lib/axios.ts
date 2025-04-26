import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + "/api",
    headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
    withXSRFToken: true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("AUTH_TOKEN");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
