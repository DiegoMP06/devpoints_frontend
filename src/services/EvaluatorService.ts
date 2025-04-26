import { api } from "@/lib/axios";
import {
    EvaluatorsIdSchema,
    EvaluatorsSchema,
    SearchForUsersForEvaluatorsSchema,
} from "@/schemas";
import {
    AddEvaluatorFormData,
    Contest,
    Evaluator,
    NotificationAPI,
    QuerySearch,
} from "@/types";
import { isAxiosError } from "axios";

type EvaluatorServiceType = {
    contestId: Contest["id"];
    query: QuerySearch["query"];
    userId: AddEvaluatorFormData["user_id"];
    relationId: Evaluator["pivot"]["id"];
};

export default {
    async searchForUserForEvaluator({
        query,
        contestId,
    }: Pick<EvaluatorServiceType, "query" | "contestId">) {
        try {
            const { data } = await api.post(
                `/contests/${contestId}/evaluators/search`,
                { query }
            );
            const response = SearchForUsersForEvaluatorsSchema.safeParse(data);
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
    async getEvaluators({
        contestId,
    }: Pick<EvaluatorServiceType, "contestId">) {
        try {
            const { data } = await api.get(`/contests/${contestId}/evaluators`);

            const response = EvaluatorsSchema.safeParse(data);

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
    async getEvaluatorsId({
        contestId,
    }: Pick<EvaluatorServiceType, "contestId">) {
        try {
            const { data } = await api.get(`/contests/${contestId}/evaluators`);

            const response = EvaluatorsIdSchema.safeParse(data);

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
    async addEvaluator({
        contestId,
        userId,
    }: Pick<EvaluatorServiceType, "userId" | "contestId">) {
        try {
            const { data: response } = await api.post<NotificationAPI>(
                `/contests/${contestId}/evaluators`,
                { user_id: userId }
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
    async removeEvaluator({
        contestId,
        relationId,
    }: Pick<EvaluatorServiceType, "relationId" | "contestId">) {
        try {
            const { data: response } = await api.delete<NotificationAPI>(
                `/contests/${contestId}/evaluators/${relationId}`
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
