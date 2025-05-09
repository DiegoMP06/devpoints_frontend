import { api } from "@/lib/axios";
import { CheckFavoriteContestSchema, FavoriteContestsSchema } from "@/schemas";
import { Contest, NotificationAPI } from "@/types";
import { isAxiosError } from "axios";

type FavoriteServiceType = {
    contestId: Contest["id"];
    favoriteId: number;
};

export default {
    async getFavoriteContests() {
        try {
            const { data } = await api.get("/favorites");
            const response = FavoriteContestsSchema.safeParse(data);
            if (!response.success) {
                throw new Error(response.error.message);
            }
            return response.data.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.message);
            } else if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    },
    async addFavoriteContest({
        contestId,
    }: Pick<FavoriteServiceType, "contestId">) {
        try {
            const { data: response } = await api.post<NotificationAPI>(
                `/favorites`,
                {
                    contest_id: contestId,
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
    async checkFavoriteContest({
        contestId,
    }: Pick<FavoriteServiceType, "contestId">) {
        try {
            const { data } = await api.get(
                `/contests/${contestId}/favorites`
            );

            const response = CheckFavoriteContestSchema.safeParse(data);

            if(!response.success) {
                throw new Error(response.error.message);
            }

            return response.data.data[0] || null;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.message);
            } else if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    },
    async removeFavoriteContest({
        favoriteId,
    }: Pick<FavoriteServiceType, "favoriteId">) {
        try {
            const { data: response } = await api.delete<NotificationAPI>(
                `/favorites/${favoriteId}`
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
