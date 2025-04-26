import { api } from "@/lib/axios";
import { UserSchema } from "@/schemas";
import { isAxiosError } from "axios";

export default {
    async csrf() {
        try {
            const { data } = await api.get("/sanctum/csrf-cookie", {
                baseURL: import.meta.env.VITE_BACKEND_URL,
            });
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                {
                    throw new Error(error.response.data.message);
                }
            }
        }
    },
    async user() {
        try {
            const { data } = await api.get("/user");
            const response = UserSchema.safeParse(data);

            if (!response.success) {
                throw new Error(response.error.message);
            }

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.message);
            } else if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    },
};
