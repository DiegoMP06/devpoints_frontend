import { api } from "@/lib/axios";
import { ExercisesSchema, TeamDetailsSchema } from "@/schemas";
import {
    Assessment,
    Contest,
    NotificationAPI,
    SubmitAssessmentFormData,
    Team,
} from "@/types";
import { isAxiosError } from "axios";

type AssessmentServiceType = {
    contestId: Contest["id"];
    teamId: Team["id"];
    exerciseId: SubmitAssessmentFormData["exercise_id"];
    assessmentId: Assessment["id"];
};

export default {
    async getDataForAssessment({
        contestId,
        teamId,
    }: Pick<AssessmentServiceType, "contestId" | "teamId">) {
        try {
            const [team, exercises] = await Promise.allSettled([
                api.get(`/contests/${contestId}/teams/${teamId}`),
                api.get(`/contests/${contestId}/exercises`),
            ]);

            if (team.status !== "fulfilled") {
                throw new Error(team.reason.message);
            }

            if (exercises.status !== "fulfilled") {
                throw new Error(exercises.reason.message);
            }

            const teamResponse = TeamDetailsSchema.safeParse(team.value.data);

            const exercisesResponse = ExercisesSchema.safeParse(
                exercises.value.data
            );

            if (!teamResponse.success) {
                throw new Error(teamResponse.error.message);
            }

            if (!exercisesResponse.success) {
                throw new Error(exercisesResponse.error.message);
            }

            return {
                team: teamResponse.data.data[0],
                exercises: exercisesResponse.data.data,
            };
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.message);
            } else if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    },
    async submitAssessment({
        contestId,
        teamId,
        exerciseId,
    }: Pick<AssessmentServiceType, "contestId" | "teamId" | "exerciseId">) {
        try {
            const { data: response } = await api.post<NotificationAPI>(
                `/contests/${contestId}/teams/${teamId}/assessments`,
                { exercise_id: exerciseId }
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
    async removeAssessment({
        contestId,
        teamId,
        assessmentId,
    }: Pick<
        AssessmentServiceType,
        "contestId" | "teamId" | "exerciseId" | "assessmentId"
    >) {
        try {
            const { data: response } = await api.delete<NotificationAPI>(
                `/contests/${contestId}/teams/${teamId}/assessments/${assessmentId}`
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
