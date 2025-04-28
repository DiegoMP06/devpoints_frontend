import TeamService from "@/services/TeamService"
import { EditTeam, TeamMember } from "@/types"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { EllipsisVerticalIcon, UserCircleIcon } from "@heroicons/react/24/solid"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { Link, useParams } from "react-router"
import { toast } from "react-toastify"
import Swal from "sweetalert2"

type MembersListUpdateProps = {
    members: EditTeam['data'][0]['members']
}

export default function MembersListUpdate({ members }: MembersListUpdateProps) {
    const params = useParams();
    const teamId = params.teamId || '';
    const contestId = params.contestId || '';
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: TeamService.deleteTeamMember,
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ['edit-team', teamId] });
            toast.success(data);
        },
        onError(error) {
            toast.error(error.message);
        }
    })

    const handleDeleteTeamMember = (memberId: TeamMember['id']) => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "No podras revertir esta accion",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, eliminar',
        }).then((result) => {
            if (result.isConfirmed) {
                mutate({
                    contestId: Number(contestId),
                    teamId: Number(teamId),
                    memberId
                })
            }
        });
    }

    const hasAddMember = useMemo(() => members.length < 10, [members]);
    const canDeleteMember = useMemo(() => members.length > 1, [members]);

    return (
        <div className="space-y-6 mt-6">
            <ul className="grid grid-cols-1">
                {members.map((member) => (
                    <li key={member.id} className=" bg-gray-100 hover:bg-gray-200 p-2 flex justify-between items-center">
                        <Link
                            to={`members/${member.id}/edit`}
                            className="text-lg font-bold text-gray-600 inline-flex gap-2 flex-1 items-center"
                        >
                            <UserCircleIcon className="size-8" />
                            {member.name} {member.father_last_name} {member.mother_last_name}
                        </Link>

                        <Menu>
                            <MenuButton className="cursor-pointer hover:bg-gray-300 transition-colors rounded">
                                <EllipsisVerticalIcon className="size-8 fill-gray-600" />
                            </MenuButton>

                            <MenuItems
                                transition
                                anchor="bottom end"
                                className="bg-white w-52 origin-top-right rounded-xl border border-gray-300 p-1 transition"
                            >
                                <MenuItem>
                                    <Link
                                        to={`members/${member.id}/edit`}
                                        className="group block hover:bg-gray-100 transition-colors text-start text-gray-600 w-full gap-2 rounded-lg px-3 py-1.5"
                                    >
                                        Editar
                                    </Link>
                                </MenuItem>

                                {canDeleteMember && (
                                    <MenuItem>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteTeamMember(member.id)}
                                            className="group block hover:bg-gray-100 transition-colors text-start text-red-600 w-full gap-2 rounded-lg px-3 py-1.5"
                                        >
                                            Eliminar
                                        </button>
                                    </MenuItem>
                                )}
                            </MenuItems>
                        </Menu>
                    </li>
                ))}
            </ul>

            {hasAddMember && (
                <nav className="block">
                    <Link
                        to="members/new"
                        className="inline-block text-white bg-purple-700 hover:bg-purple-800 px-4 py-2 transition-colors font-bold cursor-pointer"
                    >
                        Agregar Miembro
                    </Link>
                </nav>
            )}
        </div>
    )
}
