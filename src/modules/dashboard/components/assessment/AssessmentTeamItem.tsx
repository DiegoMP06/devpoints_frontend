import useDashboard from "@/hooks/useDashboard"
import { Team } from "@/types"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid"
import { Link, useParams } from "react-router"

type AssessmentTeamItemProps = {
    team: Team
}

export default function AssessmentTeamItem({ team }: AssessmentTeamItemProps) {
    const params = useParams();
    const contestId = params.contestId || '';
    const { canEvaluate } = useDashboard();

    return (
        <li key={team.id} className="flex items-center justify-between">
            <Link
                to={canEvaluate ?
                    `/dashboard/contests/${contestId}/assessment/${team.id}` :
                    `/dashboard/contests/${contestId}/assessment/teams/${team.id}/details`
                }
                className="text-gray-600 font-bold p-2 text-xl hover:underline"
            >
                {team.name}
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
                    {canEvaluate && (
                        <MenuItem>
                            <Link to={`/dashboard/contests/${contestId}/assessment/${team.id}`} className="group block hover:bg-gray-100 transition-colors text-start text-gray-600 w-full gap-2 rounded-lg px-3 py-1.5">
                                Evaluar
                            </Link>
                        </MenuItem>
                    )}
                    <MenuItem>
                        <Link to={`/dashboard/contests/${contestId}/assessment/teams/${team.id}/details`} className="group block hover:bg-gray-100 transition-colors text-start text-gray-600 w-full gap-2 rounded-lg px-3 py-1.5">
                            Ver detalles
                        </Link>
                    </MenuItem>
                </MenuItems>
            </Menu>
        </li>
    )
}
