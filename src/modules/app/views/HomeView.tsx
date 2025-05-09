import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, Navigate, useLocation } from "react-router";
import SearchForm from "../components/home/SearchForm";
import LoadingSpinner from "../components/LoadingSpinner";
import GuestService from "@/services/GuestService";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Pagination from '../components/Pagination';
import { useEffect } from "react";
import { Contest } from "@/types";

export default function HomeView() {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const queryClient = useQueryClient();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query') || '';
    const page = Number(queryParams.get('page')) || 1;

    const { data, isLoading, error } = useQuery({
        queryKey: ['home-contests'],
        queryFn: () => GuestService.getHomeContests({ query, page }),
    });

    useEffect(() => {
        queryClient.invalidateQueries({
            queryKey: ['home-contests']
        })
    }, [page, query]);

    const isPending = (started_at: Contest['started_at']) => {
        const startedAtTime = new Date(started_at).getTime();
        return startedAtTime >= Date.now();
    }

    const isActive = (started_at: Contest['started_at'], ended_at: Contest['ended_at']) => {
        const startedAtTime = new Date(started_at).getTime();
        const endedAtTime = new Date(ended_at).getTime();
        return startedAtTime < Date.now() && endedAtTime > Date.now();
    }

    const isEnded = (ended_at: Contest['ended_at']) => {
        const endedAtTime = new Date(ended_at).getTime();
        return endedAtTime <= Date.now();
    }

    if (error) return <Navigate to="/" replace />
    if (isLoading) return <LoadingSpinner />
    if (data) return (
        <>
            <SearchForm />

            {data.data.length > 0 ? (
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.data.map((contest) => (
                        <div key={contest.id} className="flex bg-white p-4 gap-4 shadow-lg items-center">
                            <div className="max-w-14">
                                <img
                                    src={`${BACKEND_URL}/storage/contests/${contest.image}`}
                                    alt={contest.name}
                                    className="w-full rounded-full block"
                                    width={100}
                                    height={100}
                                />
                            </div>

                            <div className="flex-1 flex flex-col gap-1">
                                <Link
                                    to={`/summary/contests/${contest.id}`}
                                    className="text-xl font-bold text-gray-600 hover:underline"
                                >
                                    {contest.name}
                                </Link>

                                <div>
                                    {isPending(contest.started_at) && (
                                        <p className="text-gray-700 bg-gray-200 p-1 inline-block text-xs font-bold">
                                            Todavia no ha iniciado
                                        </p>
                                    )}
                                    {isActive(contest.started_at, contest.ended_at) && (
                                        <p className="text-purple-700 bg-purple-200 p-1 inline-block text-xs font-bold">
                                            En curso
                                        </p>
                                    )}
                                    {isEnded(contest.ended_at) && (
                                        <p className="text-orange-700 bg-orange-200 p-1 inline-block text-xs font-bold">
                                            Ha Finalizado
                                        </p>
                                    )}
                                </div>

                                <p className="text-gray-400 flex gap-1 text-sm font-bold items-center">
                                    <UserCircleIcon className="size-6" />
                                    {contest.user.name}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-lg text-gray-500 text-center my-20">
                    No se encontraron competencias
                </p>
            )}

            <Pagination meta={data.meta} />
        </>
    )
}
