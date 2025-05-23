import { api } from "@/lib/axios";
import {
    ContestDetailsSchema,
    ContestsSchema,
    EditContestSchema,
} from "@/schemas";
import { ContestFormData, NotificationAPI } from "@/types";
import { isAxiosError } from "axios";
import { Contest } from "../types/index";
import { formatForBackend } from "@/utils";

type ContestServiceType = {
    data: ContestFormData;
    id: Contest["id"];
};

export default {
    async getContestsUser() {
        try {
            const { data } = await api.get("/contests");
            const response = ContestsSchema.safeParse(data);
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

    async createContest({ data }: Pick<ContestServiceType, "data">) {
        const FD = new FormData();
        FD.append("name", data.name);
        FD.append("started_at", formatForBackend(data.started_at));
        FD.append("ended_at", formatForBackend(data.ended_at));
        if (data.image) {
            FD.append("image", data.image[0]);
        }

        try {
            const { data: response } = await api.post<NotificationAPI>(
                "/contests",
                FD
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
    async getEditContest({ id }: Pick<ContestServiceType, "id">) {
        try {
            const { data } = await api.get(`/contests/${id}`);
            const response = EditContestSchema.safeParse(data);

            if (!response.success) {
                throw new Error(response.error.message);
            }

            return response.data.data[0];
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.message);
            } else if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    },

    async getContestDetails({ id }: Pick<ContestServiceType, "id">) {
        try {
            const { data } = await api.get(`/contests/${id}`);
            const response = ContestDetailsSchema.safeParse(data);

            if (!response.success) {
                throw new Error(response.error.message);
            }

            return response.data.data[0];
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.message);
            } else if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    },

    async editContest({ data, id }: Pick<ContestServiceType, "data" | "id">) {
        const FD = new FormData();
        FD.append("name", data.name);
        FD.append("started_at", formatForBackend(data.started_at));
        FD.append("ended_at", formatForBackend(data.ended_at));
        if (data.image) {
            FD.append("image", data.image[0]);
        }

        try {
            const { data: response } = await api.post<NotificationAPI>(
                `/contests/${id}?_method=PUT`,
                FD
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

    async deleteContest({ id }: Pick<ContestServiceType, "id">) {
        try {
            const { data: response } = await api.delete<NotificationAPI>(
                `/contests/${id}`
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
    async changeContestStatus({ id }: Pick<ContestServiceType, "id">) {
        try {
            const { data: response } = await api.post<NotificationAPI>(
                `/contests/${id}/status`
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
