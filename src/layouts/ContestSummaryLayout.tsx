import ContestSummaryProvider from "@/context/ContestSummaryProvider";
import useContestSummary from "@/hooks/useContestSummary";
import LoadingSpinner from "@/modules/app/components/LoadingSpinner";
import { ChartBarIcon, ClipboardDocumentCheckIcon, HeartIcon as HeartSolidIcon, PaperClipIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import { Link, Navigate, Outlet } from "react-router";
import { useMutation } from "@tanstack/react-query";
import FavoriteService from "@/services/FavoriteService";
import { toast } from "react-toastify";
import useApp from "@/hooks/useApp";

function ContestSummaryProviderLayout() {
    const { user } = useApp();
    const { contest, contestError, isContestLoading, canAssessment, mutateContest } = useContestSummary();

    const addFavoriteMutation = useMutation({
        mutationFn: FavoriteService.addFavoriteContest,
        onSuccess: (data) => {
            toast.success(data)
        },
        onError: (error) => {
            toast.error(error.message)
        },
    });

    const removeFavoriteMutation = useMutation({
        mutationFn: FavoriteService.removeFavoriteContest,
        onSuccess: (data) => {
            toast.success(data)
        },
        onError: (error) => {
            toast.error(error.message)
        },
    });

    const handleFavorite = () => {
        if (contest?.is_saved) {
            removeFavoriteMutation.mutate({
                favoriteId: contest.is_saved.pivot.id
            })
            mutateContest({
                ...contest,
                is_saved: null
            });
        } else {
            addFavoriteMutation.mutate({
                contestId: contest!.id,
            })
            mutateContest({
                ...contest!,
                is_saved: {
                    id: user!.id,
                    name: user!.name,
                    email: user!.email,
                    pivot: {
                        id: 0,
                    }
                }
            });
        }
    }

    if (isContestLoading) return <LoadingSpinner />
    if (contestError) return <Navigate to="/404" />
    if (contest) return (
        <>
            <div className="flex flex-col items-center gap-6">
                <div className="max-w-24 md:max-w-36">
                    <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/storage/contests/${contest.image}`}
                        alt={`Logo de la competencia "${contest.name}"`}
                        className="w-full h-auto block rounded-full ring-4 ring-gray-600"
                        width={100}
                        height={100}
                    />
                </div>

                <h1 className="max-w-xl font-bold text-3xl md:text-4xl text-gray-600 text-center">
                    {contest.name}
                </h1>
            </div>

            {user && (
                <div className="mt-10 flex items-center justify-center">
                    <button onClick={handleFavorite} type="button" className="text-red-700 hover:text-red-800 transition-colors cursor-pointer" title={contest.is_saved ? 'Quitar de favoritos' : 'Guardar en favoritos'}>
                        {contest.is_saved ?
                            <HeartSolidIcon className="size-8" /> :
                            <HeartOutlineIcon className="size-8" />
                        }
                    </button>
                </div>
            )}

            <nav className="hidden md:flex items-center mt-10 max-w-2xl w-full mx-auto">
                <Link to={`/summary/contests/${contest.id}`} className="border-b-2 border-gray-400 text-gray-400 hover:text-purple-700 hover:border-purple-700 transition-colors px-4 py-2 flex gap-2 text-lg font-bold flex-1 justify-center">
                    <ChartBarIcon className="size-6" />
                    Detalles
                </Link>
                <Link to={`/summary/contests/${contest.id}/exercises`} className="border-b-2 border-gray-400 text-gray-400 hover:text-purple-700 hover:border-purple-700 transition-colors px-4 py-2 flex gap-2 text-lg font-bold flex-1 justify-center">
                    <PaperClipIcon className="size-6" />
                    Ejercicios
                </Link>
                <Link to={`/summary/contests/${contest.id}/teams`} className="border-b-2 border-gray-400 text-gray-400 hover:text-purple-700 hover:border-purple-700 transition-colors px-4 py-2 flex gap-2 text-lg font-bold flex-1 justify-center">
                    <UserGroupIcon className="size-6" />
                    Equipos
                </Link>
                {canAssessment && (
                    <Link to={`/dashboard/contests/${contest.id}/assessment`} className="border-b-2 border-gray-400 text-gray-400 hover:text-purple-700 hover:border-purple-700 transition-colors px-4 py-2 flex gap-2 text-lg font-bold flex-1 justify-center">
                        <ClipboardDocumentCheckIcon className="size-6" />
                        Evaluar
                    </Link>
                )}
            </nav>

            <div className="fixed bottom-0 left-0 right-0 bg-purple-700/60 hover:bg-purple-700 transition-colors z-40">
                <nav className="flex md:hidden items-center max-w-md w-full mx-auto">
                    <Link to={`/summary/contests/${contest.id}`} className="flex-1 hover:bg-purple-800 text-white text-xs font-bold transition-colors px-4 py-2 flex gap-2 items-center justify-center">
                        <ChartBarIcon className="size-6" />
                        <span className="hidden sm:block">
                            Detalles
                        </span>
                    </Link>
                    <Link to={`/summary/contests/${contest.id}/exercises`} className="flex-1 hover:bg-purple-800 text-white text-xs font-bold transition-colors px-4 py-2 flex gap-2 items-center justify-center">
                        <PaperClipIcon className="size-6" />
                        <span className="hidden sm:block">
                            Ejercicios
                        </span>
                    </Link>
                    <Link to={`/summary/contests/${contest.id}/teams`} className="flex-1 hover:bg-purple-800 text-white text-xs font-bold transition-colors px-4 py-2 flex gap-2 items-center justify-center">
                        <UserGroupIcon className="size-6" />
                        <span className="hidden sm:block">
                            Equipos
                        </span>
                    </Link>
                    {canAssessment && (
                        <Link to={`/dashboard/contests/${contest.id}/assessment`} className="flex-1 hover:bg-purple-800 text-white text-xs font-bold transition-colors px-4 py-2 flex gap-2 items-center justify-center">
                            <ClipboardDocumentCheckIcon className="size-6" />
                            <span className="hidden sm:block">
                                Evaluar
                            </span>
                        </Link>
                    )}
                </nav>
            </div>

            <div className="mb-20">
                <Outlet />
            </div>
        </>
    )
}

export default function ContestSummaryLayout() {
    return (
        <ContestSummaryProvider>
            <ContestSummaryProviderLayout />
        </ContestSummaryProvider>
    )
}
