import { Link, Navigate, Outlet, useParams } from "react-router";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Heading from "dashboard/components/Heading";
import NavLink from "dashboard/components/NavLink";
import NavLinkContainer from "dashboard/components/NavLinkContainer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ExerciseService from "@/services/ExerciseService";
import LoadingSpinner from "app/components/LoadingSpinner";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { Exercise } from "@/types";
import useDashboard from "@/hooks/useDashboard";

export default function ExercisesView() {
    const { contest } = useDashboard();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const queryClient = useQueryClient();
    const params = useParams();
    const contestId = params.contestId || '';

    const { data, isLoading, isError } = useQuery({
        queryKey: ['exercises', contestId],
        queryFn: () => ExerciseService.getExercises({ contestId: Number(contestId) }),
    })

    const { mutate } = useMutation({
        mutationFn: ExerciseService.deleteExercise,
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ['exercises', contestId] });
            toast.success(data);
        },
        onError(error) {
            toast.error(error.message);
        }
    });

    const handleDeleteExercise = (exerciseId: Exercise['id']) => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "No podras revertir esta accion",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, eliminar',
        }).then((result) => {
            if (result.isConfirmed) {
                mutate({ contestId: Number(contestId), exerciseId });
            }
        });
    }

    if (isError) <Navigate to="/404" />
    if (isLoading) return <LoadingSpinner />
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
                    {contest?.name} &gt; Ejercicios
                </span>
            </Heading>

            <NavLinkContainer>
                <NavLink to={`/dashboard/contests/${contestId}/exercises/new`}>
                    Nuevo Ejercicio
                </NavLink>
            </NavLinkContainer>

            {data.length > 0 ?
                <div className="grid lg:grid-cols-2 gap-4 mt-10">
                    {data.map((exercise) => (
                        <div key={exercise.id} className="bg-white shadow-lg p-4 flex justify-between gap-4 items-center">
                            <div className="flex-1">
                                <Link className="block text-xl font-bold text-gray-600 hover:underline" to={`/dashboard/contests/${contestId}/exercises/${exercise.id}`}>
                                    {exercise.name}
                                </Link>

                                <p className="text-sm text-gray-400 font-bold">
                                    {exercise.points} puntos
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
                                        <Link to={`/dashboard/contests/${contestId}/exercises/${exercise.id}`} className="group block hover:bg-gray-100 transition-colors text-start text-gray-600 w-full gap-2 rounded-lg px-3 py-1.5">
                                            Ver detalles
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link to={`/dashboard/contests/${contestId}/exercises/${exercise.id}/edit`} className="group block hover:bg-gray-100 transition-colors text-start text-gray-600 w-full gap-2 rounded-lg px-3 py-1.5">
                                            Editar
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <button
                                            onClick={() => handleDeleteExercise(exercise.id)}
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
                    Todavia no has creado ningun ejercicio, {''}
                    <Link to={`/dashboard/contests/${contestId}/exercises/new`} className="text-cyan-700">
                        Ahora Crea uno.
                    </Link>
                </p>
            }

            <Outlet />
        </>
    )
}
