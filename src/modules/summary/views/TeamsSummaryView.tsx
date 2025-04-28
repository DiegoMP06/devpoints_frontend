import useContestSummary from "@/hooks/useContestSummary"
import { UserCircleIcon } from "@heroicons/react/24/solid";

export default function TeamsSummaryView() {
    const { contest } = useContestSummary();

    if (contest) return (
        <div className="bg-white p-5 md:p-8 shadow-lg mt-10 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-600">
                Equipos:
            </h2>

            {contest.teams.length > 0 ? (
                <ul className="mt-8 grid grid-cols-1 divide-gray-300 divide-y">
                    {contest.teams.map((team) => (
                        <li key={team.id} className="space-y-2 p-2">
                            <div className="flex gap-4 justify-between">
                                <h3 className="text-gray-600 font-bold text-xl">
                                    {team.name}
                                </h3>

                                <p className="text-gray-400 font-bold text-sm">
                                    {team.members.length} Miembros
                                </p>
                            </div>

                            <div className="">
                                {team.members.map((member) => (
                                    <p key={member.id} className="text-gray-600 font-bold p-1 flex gap-2 items-center">
                                        <UserCircleIcon className="size-8" /> {member.name} {member.father_last_name} {member.mother_last_name}
                                    </p>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-400 font-bold my-10">
                    Todavia no hay equipos registrados
                </p>
            )}
        </div>
    )
}
