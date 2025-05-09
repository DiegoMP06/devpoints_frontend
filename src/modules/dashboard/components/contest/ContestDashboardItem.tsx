import useApp from "@/hooks/useApp";
import ContestService from "@/services/ContestService";
import { Contest, Contests } from "@/types";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

type ContestDashboardItemProps = {
    contest: Contests['data'][0];
}

export default function ContestDashboardItem({ contest }: ContestDashboardItemProps) {
    const { user } = useApp();
    const queryClient = useQueryClient();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const deleteMutation = useMutation({
        mutationFn: ContestService.deleteContest,
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ['contests', user?.id] });
            toast.success(data);
        },
        onError(error) {
            toast.error(error.message);
        }
    });

    const publishMutation = useMutation({
        mutationFn: ContestService.changeContestStatus,
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ['contests', user?.id] });
            toast.success(data);
        },
        onError(error) {
            toast.error(error.message);
        }
    });

    const handleDeleteContest = (contestId: Contest['id']) => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "No podras revertir esta accion",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, eliminar',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate({ id: contestId });
            }
        });
    }

    const handlePublishContest = (contestId: Contest['id']) => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: `Deseas ${contest.is_published ? 'ocultar' : 'publicar'} la competencia "${contest.name}"?`,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si',
        }).then((result) => {
            if (result.isConfirmed) {
                publishMutation.mutate({ id: contestId });
            }
        });
    }

    const isCreator = useMemo(() => user?.id === contest.user_id, [user, contest]);

    return (
        <div className="bg-white shadow-lg p-4 flex justify-between gap-4">
            <div className="flex gap-4 items-center flex-1 flex-wrap">
                <div className="block">
                    <img
                        className="block rounded-full size-16 ring-2 ring-gray-100"
                        alt={`Icono de la competencia ${contest.name}`}
                        src={`${BACKEND_URL}/storage/contests/${contest.image}`}
                        width={100}
                        height={100}
                    />
                </div>

                <div className="flex-1 space-y-2">
                    <Link className="block text-xl font-bold text-gray-600 hover:underline" to={`/dashboard/contests/${contest.id}`}>
                        {contest.name}
                    </Link>

                    <div className="flex gap-2 items-center">
                        <p className={`p-1.5 text-center text-xs font-bold inline-block  ${contest.is_published ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                            {contest.is_published ? 'Publicada' : 'No publicada'}
                        </p>

                        <p className={`p-1.5 text-center text-xs font-bold inline-block  ${isCreator ? 'bg-purple-200 text-purple-700' : 'bg-cyan-200 text-cyan-700'}`}>
                            {isCreator ? 'Creador' : 'Evaluador'}
                        </p>
                    </div>
                </div>
            </div>

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
                        <Link to={`/dashboard/contests/${contest.id}`} className="group block hover:bg-gray-100 transition-colors text-start text-gray-600 w-full gap-2 rounded-lg px-3 py-1.5">
                            Ir a la Competencia
                        </Link>
                    </MenuItem>
                    {isCreator && (<>
                        <MenuItem>
                            <Link to={`/dashboard/contests/${contest.id}/edit`} className="group block hover:bg-gray-100 transition-colors text-start text-gray-600 w-full gap-2 rounded-lg px-3 py-1.5">
                                Editar
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <button
                                onClick={() => handlePublishContest(contest.id)}
                                type="button"
                                className="group block hover:bg-gray-100 transition-colors text-start text-gray-600 w-full gap-2 rounded-lg px-3 py-1.5"
                            >
                                {contest.is_published ? 'Ocultar' : 'Publicar'}
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button
                                onClick={() => handleDeleteContest(contest.id)}
                                type="button"
                                className="group block hover:bg-gray-100 transition-colors text-start text-red-600 w-full gap-2 rounded-lg px-3 py-1.5"
                            >
                                Eliminar
                            </button>
                        </MenuItem>
                    </>)}
                </MenuItems>
            </Menu>
        </div>
    )
}
