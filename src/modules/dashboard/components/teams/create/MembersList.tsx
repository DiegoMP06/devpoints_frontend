import { TeamMemberFormData } from "@/types"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { EllipsisVerticalIcon, UserCircleIcon } from "@heroicons/react/24/solid"
import { useMemo } from "react"
import { Link } from "react-router"

type MembersListProps = {
    members: TeamMemberFormData[]
    handleSelectMemberForEdit: (memberId: TeamMemberFormData["id"]) => void
    handleDeleteMember: (memberId: TeamMemberFormData["id"]) => void
}

export default function MembersList({ members, handleSelectMemberForEdit, handleDeleteMember }: MembersListProps) {
    const hasAddMember = useMemo(() => members.length < 10, [members]);

    return (
        <div className="space-y-6">
            {members.length > 0 ? (
                <ul className="grid grid-cols-1">
                    {members.map((member) => (
                        <li key={member.id} className=" bg-gray-100 hover:bg-gray-200 p-2 flex justify-between items-center">
                            <button type="button" onClick={() => handleSelectMemberForEdit(member.id)} className="text-lg font-bold text-gray-600 inline-flex gap-2 flex-1 items-center">
                                <UserCircleIcon className="size-8" />
                                {member.name} {member.father_last_name} {member.mother_last_name}
                            </button>

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
                                        <button type="button" onClick={() => handleSelectMemberForEdit(member.id)} className="group block hover:bg-gray-100 transition-colors text-start text-gray-600 w-full gap-2 rounded-lg px-3 py-1.5">
                                            Editar
                                        </button>
                                    </MenuItem>
                                    <MenuItem>
                                        <button
                                            onClick={() => handleDeleteMember(member.id)}
                                            type="button"
                                            className="group block hover:bg-gray-100 transition-colors text-start text-red-600 w-full gap-2 rounded-lg px-3 py-1.5"
                                        >
                                            Eliminar
                                        </button>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-600">
                    No hay miembros en el equipo
                </p>
            )}

            {hasAddMember && (
                <nav className="block">
                    <Link to="?add-member=true" className="inline-block text-white bg-purple-700 hover:bg-purple-800 px-4 py-2 transition-colors font-bold cursor-pointer">
                        Agregar Miembro
                    </Link>
                </nav>
            )}
        </div>
    )
}
