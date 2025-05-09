import { api } from "@/lib/axios";
import { AuthenticationSchema } from "@/schemas";
import { NotificationAPI, UserLoginForm, UserRegisterForm } from "@/types";
import { isAxiosError } from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

export default {
    async register(data: UserRegisterForm) {
        try {
            const { data: response } = await api.post("/register", data, {
                baseURL,
            });

            const dataFilter = AuthenticationSchema.safeParse(response);

            if (!dataFilter.success) {
                throw new Error(dataFilter.error.message);
            }

            localStorage.setItem("AUTH_TOKEN", dataFilter.data.token);
            return dataFilter.data.user;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.message);
            } else if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    },
    async emailVerificationNotification() {
        try {
            const { data } = await api.post<NotificationAPI>(
                "/email/verification-notification",
                null,
                { baseURL }
            );
            return data.message;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.message);
            } else if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    },
    async login(data: UserLoginForm) {
        try {
            const { data: response } = await api.post("/login", data, {
                baseURL,
            });

            const dataFilter = AuthenticationSchema.safeParse(response);

            if (!dataFilter.success) {
                throw new Error(dataFilter.error.message);
            }

            localStorage.setItem("AUTH_TOKEN", dataFilter.data.token);
            return dataFilter.data.user;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.message);
            } else if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    },
    async logout() {
        try {
            await api.post("/logout", null, {
                baseURL,
            });

            localStorage.removeItem("AUTH_TOKEN");
            
            return null;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.message);
            } else if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    },
};
