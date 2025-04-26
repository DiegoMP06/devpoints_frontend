import Modal from "@/modules/app/components/Modal";
import AssessmentService from "@/services/AssessmentService";
import { DialogTitle } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import ExerciseItem from "../../components/assessment/ExerciseItem";

export default function AssessmentTeamView() {
    const navigate = useNavigate();
    const params = useParams();
    const contestId = params.contestId || '';
    const teamId = params.teamId || '';

    const { data, isError } = useQuery({
        queryKey: ['assessment-team', teamId],
        queryFn: () => AssessmentService.getDataForAssessment({
            contestId: Number(contestId),
            teamId: Number(teamId),
        })
    });

    if (isError) return <Navigate to={`/dashboard/contests/${contestId}/assessment`} />

    if (data) return (
        <Modal show={true} onClose={() => navigate(`/dashboard/contests/${contestId}/assessment`)}>
            <DialogTitle
                as="h3"
                className="text-3xl font-bold text-gray-600"
            >
                {data.team.name}
            </DialogTitle>

            <p className="text-xl font-bold text-gray-400">
                Evalua con los siguientes criterios:
            </p>

            {data.exercises.length > 0 ? (
                <ul className="my-6 grid grid-cols-1 divide-gray-300 divide-y">
                    {data.exercises.map((exercise) => (
                        <ExerciseItem key={exercise.id} exercise={exercise} team={data.team} />
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 text-center my-10">
                    Todavia no hay ejercicios.
                </p>
            )}

            <nav className="mt-10 flex gap-2 flex-wrap">
                <Link to={`/dashboard/contests/${contestId}/assessment`} className="inline-block bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-3 px-4 mt-4">
                    Volver
                </Link>

                <Link to={`/dashboard/contests/${contestId}/assessment/teams/${teamId}/details`} className="inline-block bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-3 px-4 mt-4">
                    Ver Detalles del Equipo
                </Link>
            </nav>
        </Modal>
    )
}
