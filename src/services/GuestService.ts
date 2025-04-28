import { api } from "@/lib/axios";
import { ContestSummarySchema, HomeContestsSchema } from "@/schemas";
import { Contest, QuerySearch } from "@/types";
import { isAxiosError } from "axios";

type GuestServiceType = {
    query: QuerySearch["query"];
    page: number;
    contestId: Contest['id'];
};

export default {
    async getHomeContests({
        query,
        page,
    }: Pick<GuestServiceType, "query" | "page">) {
        try {
            const { data } = await api.get(
                `/contests/search?page=${page}&query=${query}`
            );
            const response = HomeContestsSchema.safeParse(data);
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
    async getContestSummary({contestId}: Pick<GuestServiceType, 'contestId'>) {
        try {
            const { data } = await api.get(
                `/contests/${contestId}/summary`
            );
            const response = ContestSummarySchema.safeParse(data);
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
};
