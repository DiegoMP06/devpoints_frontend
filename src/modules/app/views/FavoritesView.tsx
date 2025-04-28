import useApp from "@/hooks/useApp";
import FavoriteService from "@/services/FavoriteService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link, Navigate } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import Heading from "@/modules/dashboard/components/Heading";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

export default function FavoritesView() {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const queryClient = useQueryClient();
    const { user } = useApp();

    const { data, isError, isLoading } = useQuery({
        queryKey: ['favorites-contests', user?.id],
        queryFn: FavoriteService.getFavoriteContests,
    });


    const { mutate, isPending } = useMutation({
        mutationFn: FavoriteService.removeFavoriteContest,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['favorites-contests', user?.id] });
            toast.success(data)
        },
        onError: (error) => {
            toast.error(error.message)
        },
    });


    if (isError) return <Navigate to="/login" />
    if (isLoading) return <LoadingSpinner />
    if (data) return (
        <>
            <Heading>
                Favoritos
            </Heading>

            <p className="text-xl font-bold text-gray-400">
                Aqui podras ver tus competencias favoritas
            </p>

            {data.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10">
                    {data.map(contest =>
                        <div key={contest.id} className="bg-white shadow-lg p-4 flex justify-between gap-4">
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
                                    <Link className="block text-xl font-bold text-gray-600 hover:underline" to={contest.is_published ? `/summary/contests/${contest.id}` : ``}>
                                        {contest.name}
                                    </Link>

                                    <div className="flex gap-2 items-center">
                                        <p className={`p-1.5 text-center text-xs font-bold inline-block  ${contest.is_published ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                                            {contest.is_published ? 'Publicada' : 'No publicada'}
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
                                    {Boolean(contest.is_published) && (
                                        <MenuItem>
                                            <Link to={`/summary/contests/${contest.id}`} className="group block hover:bg-gray-100 transition-colors text-start text-gray-600 w-full gap-2 rounded-lg px-3 py-1.5">
                                                Ir a la Competencia
                                            </Link>
                                        </MenuItem>
                                    )}
                                    <MenuItem>
                                        <button
                                            onClick={() => mutate({ favoriteId: contest.pivot.id })}
                                            disabled={isPending}
                                            type="button"
                                            className="group block hover:bg-gray-100 transition-colors text-start text-red-600 w-full gap-2 rounded-lg px-3 py-1.5"
                                        >
                                            Eliminar de Favoritos
                                        </button>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>
                    )}
                </div>
            ) : (
                <p className="text-center my-20 font-bold text-gray-400">
                    No tienes ninguna competencia favorita
                </p>
            )}
        </>
    )
}
