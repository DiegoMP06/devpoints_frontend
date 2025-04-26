import Modal from "@/modules/app/components/Modal";
import EvaluatorService from "@/services/EvaluatorService";
import { QuerySearch, User } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import SearchEvaluatorForm from "../../components/evaluators/SearchEvaluatorForm";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useMemo } from "react";
import useApp from "@/hooks/useApp";

export default function NewEvaluatorView() {
    const { user } = useApp();
    const queryClient = useQueryClient();
    const params = useParams()
    const contestId = params.contestId || ''
    const navigate = useNavigate();

    const { data, isError } = useQuery({
        queryKey: ['evaluators-id', contestId],
        queryFn: () => EvaluatorService.getEvaluatorsId({ contestId: Number(contestId) }),
    });

    const initialValues: QuerySearch = {
        query: ''
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialValues
    })

    const searchMutation = useMutation({
        mutationFn: EvaluatorService.searchForUserForEvaluator,
        onError(error) {
            toast.error(error.message);
        }
    });

    const addEvaluatorMutation = useMutation({
        mutationFn: EvaluatorService.addEvaluator,
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ['evaluators', contestId] });
            queryClient.invalidateQueries({ queryKey: ['evaluators-id', contestId] });
            toast.success(data);
        },
        onError(error) {
            toast.error(error.message);
        }
    });

    const handleSearchEvaluator: SubmitHandler<QuerySearch> = ({ query }) =>
        searchMutation.mutate({
            query,
            contestId: Number(contestId),
        })


    const canAddEvaluator = useMemo(() => (userId: User['id']) =>
        !data?.some(evaluator => evaluator.id === userId) && userId !== user?.id, [data, user]);

    if (isError) return <Navigate to={`/dashboard/contests/${contestId}/evaluators`} />
    if (data) return (
        <Modal show={true} onClose={() => navigate(`/dashboard/contests/${contestId}/evaluators`)}>
            <SearchEvaluatorForm
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                handleSearchEvaluator={handleSearchEvaluator}
            />

            {(searchMutation.data && searchMutation.data.length > 0) ? (
                <ul className="grid grid-cols-1 divide-gray-300 divide-y my-6">
                    {searchMutation.data.map((evaluator) => (
                        <li key={evaluator.id} className="px-4 py-2 flex items-center gap-4 flex-wrap">
                            <div className="flex gap-2 items-center flex-1">
                                <UserCircleIcon className="size-8" />
                                <div>
                                    <p className="font-bold text-gray-600 text-xl">
                                        {evaluator.name}
                                    </p>
                                    <p className="text-sm font-bold text-gray-400">
                                        {evaluator.email}
                                    </p>
                                </div>
                            </div>

                            {canAddEvaluator(evaluator.id) && (
                                <button
                                    onClick={() => addEvaluatorMutation.mutate({
                                        userId: evaluator.id,
                                        contestId: Number(contestId),
                                    })}
                                    type="button"
                                    className="block text-white font-bold text-sm bg-purple-700 hover:bg-purple-800 px-4 py-2 disabled:opacity-25 disabled:cursor-not-allowed"
                                    disabled={addEvaluatorMutation.isPending}
                                >
                                    Agregar
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500 text-lg my-20">
                    No se encontraron Evaluadores
                </p>
            )}

            <Link to={`/dashboard/contests/${contestId}/evaluators`} className="inline-block bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-3 px-4 mt-4">
                Volver
            </Link>
        </Modal>
    )
}
