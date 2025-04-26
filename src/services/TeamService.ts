import { api } from "@/lib/axios";
import {
    EditTeamMemberSchema,
    EditTeamSchema,
    TeamDetailsSchema,
    TeamsSchema,
} from "@/schemas";
import {
    Contest,
    CreateTeamFormData,
    EditTeamFormData,
    NotificationAPI,
    Team,
    TeamMember,
    TeamMemberFormData,
} from "@/types";
import { isAxiosError } from "axios";

type TeamServiceType = {
    dataCreate: CreateTeamFormData;
    dataEdit: EditTeamFormData;
    dataMember: TeamMemberFormData;
    contestId: Contest["id"];
    teamId: Team["id"];
    memberId: TeamMember["id"];
};

export default {
    async getTeams({ contestId }: Pick<TeamServiceType, "contestId">) {
        try {
            const { data } = await api.get(`/contests/${contestId}/teams`);
            const response = TeamsSchema.safeParse(data);
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
    async createTeam({
        dataCreate,
        contestId,
    }: Pick<TeamServiceType, "dataCreate" | "contestId">) {
        try {
            const { data: response } = await api.post<NotificationAPI>(
                `/contests/${contestId}/teams`,
                dataCreate
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
    async getEditTeam({
        contestId,
        teamId,
    }: Pick<TeamServiceType, "contestId" | "teamId">) {
        try {
            const { data } = await api.get(
                `/contests/${contestId}/teams/${teamId}`
            );
            const response = EditTeamSchema.safeParse(data);
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
    async getTeamDetails({
        contestId,
        teamId,
    }: Pick<TeamServiceType, "contestId" | "teamId">) {
        try {
            const { data } = await api.get(
                `/contests/${contestId}/teams/${teamId}`
            );
            const response = TeamDetailsSchema.safeParse(data);
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
    async editTeam({
        dataEdit,
        contestId,
        teamId,
    }: Pick<TeamServiceType, "dataEdit" | "contestId" | "teamId">) {
        try {
            const { data: response } = await api.put<NotificationAPI>(
                `/contests/${contestId}/teams/${teamId}`,
                dataEdit
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
    async deleteTeam({
        contestId,
        teamId,
    }: Pick<TeamServiceType, "contestId" | "teamId">) {
        try {
            const { data: response } = await api.delete<NotificationAPI>(
                `/contests/${contestId}/teams/${teamId}`
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
    async createTeamMember({
        dataMember,
        teamId,
        contestId,
    }: Pick<TeamServiceType, "dataMember" | "contestId" | "teamId">) {
        try {
            const { data: response } = await api.post<NotificationAPI>(
                `/contests/${contestId}/teams/${teamId}/members`,
                dataMember
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
    async getEditTeamMember({
        contestId,
        teamId,
        memberId,
    }: Pick<TeamServiceType, "contestId" | "teamId" | "memberId">) {
        try {
            const { data } = await api.get(
                `/contests/${contestId}/teams/${teamId}/members/${memberId}`
            );
            const response = EditTeamMemberSchema.safeParse(data);
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
    async editTeamMember({
        dataMember,
        contestId,
        teamId,
        memberId,
    }: Pick<
        TeamServiceType,
        "dataMember" | "contestId" | "teamId" | "memberId"
    >) {
        try {
            const { data: response } = await api.put<NotificationAPI>(
                `/contests/${contestId}/teams/${teamId}/members/${memberId}`,
                dataMember
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
    async deleteTeamMember({
        contestId,
        teamId,
        memberId,
    }: Pick<TeamServiceType, "contestId" | "teamId" | "memberId">) {
        try {
            const { data: response } = await api.delete<NotificationAPI>(
                `/contests/${contestId}/teams/${teamId}/members/${memberId}`
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
