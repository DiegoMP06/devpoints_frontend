import { api } from "@/lib/axios";
import {
    EditPasswordFormData,
    EditProfileFormData,
    NotificationAPI,
} from "@/types";
import { isAxiosError } from "axios";

export default {
    async editProfile(data: EditProfileFormData) {
        try {
            const { data: response } = await api.post<NotificationAPI>(
                "/profile",
                data,
                {
                    baseURL: import.meta.env.VITE_BACKEND_URL,
                }
            );
            return response.message;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.message);
            } else if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    },
    async editPassword(data: EditPasswordFormData) {
        try {
            const { data: response } = await api.post<NotificationAPI>(
                "/profile/password",
                data,
                {
                    baseURL: import.meta.env.VITE_BACKEND_URL,
                }
            );
            return response.message;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.message);
            } else if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    },
};
