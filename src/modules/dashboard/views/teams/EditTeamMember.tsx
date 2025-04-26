import LoadingSpinner from "@/modules/app/components/LoadingSpinner";
import TeamService from "@/services/TeamService";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router";
import EditTeamMemberForm from "../../components/teams/update/EditTeamMemberForm";

export default function EditTeamMember() {
    const params = useParams();
    const memberId = params.memberId || '';
    const teamId = params.teamId || '';
    const contestId = params.contestId || '';

    const { data, isLoading, isError } = useQuery({
        queryKey: ['edit-team-member', teamId, memberId],
        queryFn: () => TeamService.getEditTeamMember({
            contestId: Number(contestId),
            teamId: Number(teamId),
            memberId: Number(memberId),
        })
    });

    if(isError) return <Navigate to={`/dashboard/contests/${contestId}/teams/${teamId}/edit`} />
    if(isLoading) return <LoadingSpinner />;
    if(data) return <EditTeamMemberForm member={data} />
}
