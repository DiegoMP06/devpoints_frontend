import { api } from "@/lib/axios";
import {
    EditExerciseSchema,
    ExerciseDetailsSchema,
    ExercisesSchema,
} from "@/schemas";
import { Contest, Exercise, ExerciseFormData, NotificationAPI } from "@/types";
import { isAxiosError } from "axios";

type ExerciseServiceType = {
    contestId: Contest["id"];
    exerciseId: Exercise["id"];
    data: ExerciseFormData;
};

export default {
    async getExercises({ contestId }: Pick<ExerciseServiceType, "contestId">) {
        try {
            const { data } = await api.get(`/contests/${contestId}/exercises`);
            const response = ExercisesSchema.safeParse(data);
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
    async createExercise({
        data,
        contestId,
    }: Pick<ExerciseServiceType, "data" | "contestId">) {
        try {
            const { data: response } = await api.post<NotificationAPI>(
                `/contests/${contestId}/exercises`,
                data
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
    async getEditExercise({
        exerciseId,
        contestId,
    }: Pick<ExerciseServiceType, "contestId" | "exerciseId">) {
        try {
            const { data } = await api.get(
                `/contests/${contestId}/exercises/${exerciseId}`
            );
            const response = EditExerciseSchema.safeParse(data);

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
    async getExerciseDetails({
        exerciseId,
        contestId,
    }: Pick<ExerciseServiceType, "contestId" | "exerciseId">) {
        try {
            const { data } = await api.get(
                `/contests/${contestId}/exercises/${exerciseId}`
            );
            const response = ExerciseDetailsSchema.safeParse(data);

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
    async editExercise({
        data,
        contestId,
        exerciseId,
    }: Pick<ExerciseServiceType, "data" | "contestId" | "exerciseId">) {
        try {
            const { data: response } = await api.put<NotificationAPI>(
                `/contests/${contestId}/exercises/${exerciseId}`,
                data
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
    async deleteExercise({
        contestId,
        exerciseId,
    }: Pick<ExerciseServiceType, "contestId" | "exerciseId">) {
        try {
            const { data: response } = await api.delete<NotificationAPI>(
                `/contests/${contestId}/exercises/${exerciseId}`
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
