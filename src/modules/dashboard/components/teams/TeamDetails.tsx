import Modal from "app/components/Modal";
import TeamService from "@/services/TeamService";
import { DialogTitle } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router";

type TeamDetailsProps = {
    urlToReturn: string
}

export default function TeamDetails({ urlToReturn }: TeamDetailsProps) {
    const params = useParams()
    const navigate = useNavigate();
    const contestId = params.contestId || ''
    const teamId = params.teamId || ''

    const { data, isError } = useQuery({
        queryKey: ['team', teamId],
        queryFn: () => TeamService.getTeamDetails({
            contestId: Number(contestId),
            teamId: Number(teamId),
        })
    });

    if (isError) return <Navigate to={urlToReturn} />;
    if (data) return (
        <Modal show={true} onClose={() => navigate(urlToReturn)}>
            <DialogTitle
                as="h3"
                className="text-3xl font-bold text-gray-600"
            >
                {data.name}
            </DialogTitle>

            <p className="text-xl font-bold text-gray-400 mt-6">
                Miembros del Equipo:
            </p>

            <ul className="mt-2">
                {data.members.map((member) => (
                    <li key={member.id} className="text-lg font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 py-3 px-4 flex items-center gap-4">
                        <UserCircleIcon className="size-8" />
                        {member.name} {member.father_last_name} {member.mother_last_name}
                    </li>
                ))}
            </ul>

            <Link to={urlToReturn} className="mt-10 inline-block bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-3 px-4">
                Volver
            </Link>
        </Modal>
    );
}
