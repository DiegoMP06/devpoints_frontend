import { Link, Navigate, Outlet, useParams } from "react-router";
import Heading from "../../components/Heading";
import NavLink from "../../components/NavLink";
import NavLinkContainer from "../../components/NavLinkContainer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import EvaluatorService from "@/services/EvaluatorService";
import LoadingSpinner from "@/modules/app/components/LoadingSpinner";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { Evaluator } from "@/types";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function EvaluatorsView() {
    const queryClient = useQueryClient();
    const params = useParams();
    const contestId = params.contestId || '';

    const { data, isLoading, isError } = useQuery({
        queryKey: ['evaluators', contestId],
        queryFn: () => EvaluatorService.getEvaluators({
            contestId: Number(contestId)
        })
    });

    const { mutate, isPending } = useMutation({
        mutationFn: EvaluatorService.removeEvaluator,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['evaluators', contestId] });
            queryClient.invalidateQueries({ queryKey: ['evaluators-id', contestId] });
            toast.success(data);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const handleRemoveEvaluator = (relationId: Evaluator['pivot']['id']) => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "No podras revertir esta accion",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, eliminar',
        }).then((result) => {
            if (result.isConfirmed) {
                mutate({ contestId: Number(contestId), relationId });
            }
        });
    }

    if (isError) return <Navigate to="/404" />;
    if (isLoading) return <LoadingSpinner />;
    if (data) return (
        <>
            <Heading>
                Evaluadores
            </Heading>

            <NavLinkContainer>
                <NavLink to={`/dashboard/contests/${contestId}/evaluators/new`}>
                    Agregar Evaluador
                </NavLink>
            </NavLinkContainer>

            {data.length > 0 ?
                <div className="grid lg:grid-cols-2 gap-4 mt-10">
                    {data.map((evaluator) => (
                        <div key={evaluator.id} className="bg-white shadow-lg p-4 flex justify-between gap-4 items-center">
                            <div className="flex-1">
                                <p className="block text-xl font-bold text-gray-600 hover:underline">
                                    {evaluator.name}
                                </p>

                                <p className="text-sm text-gray-400 font-bold">
                                    {evaluator.email}
                                </p>
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
                                        <button
                                            disabled={isPending}
                                            onClick={() => handleRemoveEvaluator(evaluator.pivot.id)}
                                            type="button"
                                            className="group block hover:bg-gray-100 transition-colors text-start text-red-600 w-full gap-2 rounded-lg px-3 py-1.5"
                                        >
                                            Desvincular
                                        </button>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>
                    ))}
                </div>
                :
                <p className="text-center text-gray-500 mt-20 text-lg">
                    Todavia no has agregado a ningun evaluador, {''}
                    <Link to={`/dashboard/contests/${contestId}/evaluators/new`} className="text-cyan-700">
                        Ahora Agrega a uno.
                    </Link>
                </p>
            }

            <Outlet />
        </>
    )
}
