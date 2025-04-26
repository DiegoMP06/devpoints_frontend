import LoadingSpinner from "@/modules/app/components/LoadingSpinner";
import TeamService from "@/services/TeamService";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet, useParams } from "react-router";
import Heading from "dashboard/components/Heading";
import NavLink from "dashboard/components/NavLink";
import NavLinkContainer from "dashboard/components/NavLinkContainer";
import EditTeamForm from "dashboard/components/forms/EditTeamForm";
import MembersListUpdate from "../../components/teams/update/MembersListUpdate";

export default function EditTeamView() {
    const params = useParams();
    const teamId = params.teamId || '';
    const contestId = params.contestId || '';

    const { data, isLoading, isError } = useQuery({
        queryKey: ['edit-team', teamId],
        queryFn: () => TeamService.getEditTeam({ contestId: Number(contestId), teamId: Number(teamId) }),
    });

    if (isError) return <Navigate to="/404" />;
    if (isLoading) return <LoadingSpinner />;
    if (data) return (
        <>
            <Heading>
                Editar Equipo
            </Heading>

            <NavLinkContainer>
                <NavLink to={`/dashboard/contests/${contestId}/teams`}>
                    Volver
                </NavLink>
            </NavLinkContainer>

            <EditTeamForm team={data} />

            <div className="mt-20 max-w-2xl bg-white p-8 shadow-lg mx-auto">
                <h2 className="text-2xl font-bold text-gray-600">
                    Miembros
                </h2>

                <MembersListUpdate members={data.members} />
            </div>

            <Outlet />
        </>
    )
}
