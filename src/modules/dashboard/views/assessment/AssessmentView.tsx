import useDashboard from "@/hooks/useDashboard";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { Link, Outlet, useParams } from "react-router";
import AssessmentTeamItem from "../../components/assessment/AssessmentTeamItem";
import ChangeHistory from "../../components/assessment/ChangeHistory";
import Heading from "../../components/Heading";

export default function AssessmentView() {
    const { contest } = useDashboard();
    const params = useParams();
    const contestId = params.contestId || '';

    if (contest) return (
        <>
            <Heading>
                Evaluar
            </Heading>

            <section className="max-w-2xl bg-white p-8 shadow-lg mx-auto my-10">
                <h2 className="text-2xl font-bold text-gray-600">
                    Equipos:
                </h2>

                {contest.teams.length > 0 ? (
                    <ul className="mt-6 grid grid-cols-1 divide-gray-300 divide-y">
                        {contest.teams.map((team) => (
                            <AssessmentTeamItem key={team.id} team={team} />
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-center my-10">
                        Todavia no hay equipos.
                    </p>
                )}
            </section>

            <section className="max-w-2xl bg-white p-8 shadow-lg mx-auto my-10">
                <h2 className="text-2xl font-bold text-gray-600">
                    Ejercicios:
                </h2>

                {contest.exercises.length > 0 ? (
                    <ul className="mt-6 grid grid-cols-1 divide-gray-300 divide-y">
                        {contest.exercises.map((exercise) => (
                            <li key={exercise.id} className="flex items-center justify-between">
                                <Link to={`/dashboard/contests/${contestId}/assessment/exercises/${exercise.id}/details`} className="text-gray-600 font-bold p-4 text-xl hover:underline">
                                    {exercise.name}
                                </Link>

                                <Menu>
                                    <MenuButton className="cursor-pointer hover:bg-gray-50 transition-colors rounded">
                                        <EllipsisVerticalIcon className="size-8 fill-gray-600" />
                                    </MenuButton>

                                    <MenuItems
                                        transition
                                        anchor="bottom end"
                                        className="bg-white w-52 origin-top-right rounded-xl border border-gray-300 p-1 transition"
                                    >
                                        <MenuItem>
                                            <Link to={`/dashboard/contests/${contestId}/assessment/exercises/${exercise.id}/details`} className="group block hover:bg-gray-100 transition-colors text-start text-gray-600 w-full gap-2 rounded-lg px-3 py-1.5">
                                                Ver detalles
                                            </Link>
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-center my-10">
                        Todavia no hay equipos.
                    </p>
                )}
            </section>

            {contest.teams.length > 0 && (
                <ChangeHistory teams={contest.teams} />
            )}

            <Outlet />
        </>
    )
}
