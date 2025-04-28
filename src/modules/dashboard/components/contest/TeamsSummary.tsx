import { Link, useParams } from "react-router";
import { Team } from '@/types';
import { useMemo } from "react";
import useDashboard from "@/hooks/useDashboard";

type TeamsSummaryProps = {
    teams: Team[]
}

export default function TeamsSummary({ teams }: TeamsSummaryProps) {
    const { isCreatorOfTheContest } = useDashboard();
    const params = useParams();
    const contestId = params.contestId || '';

    const totalMembers = useMemo(() => teams.reduce((total, team) => total + team.members.length, 0), [teams]);

    return (
        <section className="max-w-2xl bg-white p-5 md:p-8 shadow-lg mx-auto my-10">
            <h2 className="text-2xl font-bold text-gray-600">
                Equipos:
            </h2>

            {teams.length > 0 ? (
                <ul className="my-6 grid grid-cols-1 divide-gray-300 divide-y">
                    {teams.map((team, i) => (
                        <li key={team.id} className="text-gray-600 font-bold p-2 flex items-center justify-between gap-4">
                            {i + 1}. {team.name}
                            <span className="text-sm text-gray-400 font-bold">
                                {team.members.length} Miembros
                            </span>
                        </li>
                    ))}

                    <li className="text-gray-600 font-bold p-2 flex items-center justify-between gap-4">
                        Total:
                        <span className="text-sm text-gray-400 font-bold">
                            {totalMembers} Participantes
                        </span>
                    </li>
                </ul>
            ) : (
                <p className="text-gray-500 text-center my-10">
                    Todavia no hay equipos.
                    {isCreatorOfTheContest && (<>
                        Puedes crear uno  {''}
                        <Link
                            to={`/dashboard/contests/${contestId}/teams/new`}
                            className="text-cyan-700 font-bold"
                        >
                            aqui.
                        </Link>
                    </>)}
                </p>
            )}

            {isCreatorOfTheContest && (
                <Link to={`/dashboard/contests/${contestId}/teams`} className="px-4 py-2 bg-cyan-700 hover:bg-cyan-800 text-white font-bold cursor-pointer transition-colors inline-block">
                    Ver Más
                </Link>
            )}
        </section>
    )
}
