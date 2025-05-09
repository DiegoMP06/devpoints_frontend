import useApp from "@/hooks/useApp";
import FavoriteService from "@/services/FavoriteService";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { v4 as uuid } from 'uuid'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { toast } from "react-toastify";

export default function LikeButton() {
    const { user } = useApp();
    const queryClient = useQueryClient();
    const params = useParams();
    const contestId = params.contestId || '';

    const { data } = useQuery({
        queryKey: ['contest-favorite', user?.id, contestId],
        queryFn: () => FavoriteService.checkFavoriteContest({
            contestId: Number(contestId),
        }),
    });

    const addFavoriteMutation = useMutation({
        mutationFn: FavoriteService.addFavoriteContest,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['contest-favorite', user?.id, contestId]
            });
            toast.success(data)
        },
        onError: (error) => {
            toast.error(error.message)
        },
    });

    const removeFavoriteMutation = useMutation({
        mutationFn: FavoriteService.removeFavoriteContest,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['contest-favorite', user?.id, contestId]
            });
            toast.success(data)
        },
        onError: (error) => {
            toast.error(error.message)
        },
    });

    const handleFavorite = () => {
        if (data) {
            removeFavoriteMutation.mutate({
                favoriteId: data.pivot.id
            })

            queryClient.setQueryData(['contest-favorite', user?.id, contestId], null);
        } else {
            addFavoriteMutation.mutate({
                contestId: Number(contestId),
            })

            queryClient.setQueryData(['contest-favorite', user?.id, contestId], () => ({
                pivot: {
                    id: uuid(),
                }
            }));
        }

    }

    return (
        <div className="mt-10 flex items-center justify-center">
            <button
                onClick={handleFavorite}
                type="button" className="text-red-700 hover:text-red-800 transition-colors cursor-pointer"
                title={data ? 'Quitar de favoritos' : 'Guardar en favoritos'}
            >
                {data ?
                    <HeartSolidIcon className="size-8" /> :
                    <HeartOutlineIcon className="size-8" />
                }
            </button>
        </div>
    )
}
