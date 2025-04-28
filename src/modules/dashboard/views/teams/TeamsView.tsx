import { Link, Navigate, Outlet, useParams } from "react-router";
import Heading from "dashboard/components/Heading";
import NavLink from "dashboard/components/NavLink";
import NavLinkContainer from "dashboard/components/NavLinkContainer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TeamService from "@/services/TeamService";
import LoadingSpinner from "@/modules/app/components/LoadingSpinner";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { Team } from "@/types";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useDashboard from "@/hooks/useDashboard";

export default function TeamsView() {
    const { contest } = useDashboard()
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const params = useParams();
    const queryClient = useQueryClient();
    const contestId = params.contestId || '';

    const { data, isError, isLoading } = useQuery({
        queryKey: ['teams', contestId],
        queryFn: () => TeamService.getTeams({ contestId: Number(contestId) }),
    });

    const { mutate } = useMutation({
        mutationFn: TeamService.deleteTeam,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['teams', contestId] });
            toast.success(data);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const handleDeleteTeam = (teamId: Team['id']) => {
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
                    teamId
                })
            }
        });
    }

    if (isError) return <Navigate to="/404" />;
    if (isLoading) return <LoadingSpinner />;
    if (data) return (
        <>
            <Heading className="flex md:items-center flex-col md:flex-row gap-4">
                <span className="inline-block">
                    <img
                        alt={`Logo de la competencia ${contest?.name}`}
                        src={`${BACKEND_URL}/storage/contests/${contest?.image}`}
                        className="inline-block size-16 md:size-14 rounded-full ring-2 ring-white"
                        width={100}
                        height={100}
                    />
                </span>
                <span className="flex-1">
                    {contest?.name} &gt; Equipos
                </span>
            </Heading>

            <NavLinkContainer>
                <NavLink to={`/dashboard/contests/${contestId}/teams/new`}>
                    Nuevo Equipo
                </NavLink>
            </NavLinkContainer>

            {data.length > 0 ?
                <div className="grid lg:grid-cols-2 gap-4 mt-10">
                    {data.map((team) => (
                        <div key={team.id} className="bg-white shadow-lg p-4 flex justify-between gap-4 items-center">
                            <Link
                                className="block text-xl font-bold text-gray-600 hover:underline flex-1"
                                to={`/dashboard/contests/${contestId}/teams/${team.id}`}
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
                                    <MenuItem>
                                        <Link to={`/dashboard/contests/${contestId}/teams/${team.id}`} className="group block hover:bg-gray-100 transition-colors text-start text-gray-600 w-full gap-2 rounded-lg px-3 py-1.5">
                                            Ver detalles
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link to={`/dashboard/contests/${contestId}/teams/${team.id}/edit`} className="group block hover:bg-gray-100 transition-colors text-start text-gray-600 w-full gap-2 rounded-lg px-3 py-1.5">
                                            Editar
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <button
                                            onClick={() => handleDeleteTeam(team.id)}
                                            type="button"
                                            className="group block hover:bg-gray-100 transition-colors text-start text-red-600 w-full gap-2 rounded-lg px-3 py-1.5"
                                        >
                                            Eliminar
                                        </button>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>
                    ))}
                </div>
                :
                <p className="text-center text-gray-500 mt-20 text-lg">
                    Todavia no has creado ningun equipo, {''}
                    <Link to={`/dashboard/contests/${contestId}/teams/new`} className="text-cyan-700">
                        Ahora Crea uno.
                    </Link>
                </p>
            }

            <Outlet />
        </>
    )
}
