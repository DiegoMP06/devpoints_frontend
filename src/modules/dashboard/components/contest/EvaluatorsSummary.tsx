
import useDashboard from "@/hooks/useDashboard";
import { Evaluator } from "@/types";
import { Link, useParams } from "react-router";

type EvaluatorsSummaryProps = {
    evaluators: Evaluator[];
}

export default function EvaluatorsSummary({ evaluators }: EvaluatorsSummaryProps) {
    const { isCreatorOfTheContest } = useDashboard();
    const params = useParams();
    const contestId = params.contestId || '';

    return (
        <section className="max-w-2xl bg-white p-8 shadow-lg mx-auto my-10">
            <h2 className="text-2xl font-bold text-gray-600">
                Evaluadores:
            </h2>

            {evaluators.length > 0 ? (
                <ul className="my-6 grid grid-cols-1 divide-gray-300 divide-y">
                    {evaluators.map((evaluator, i) => (
                        <li key={evaluator.id} className="text-gray-600 font-bold px-4 py-2 flex items-center justify-between gap-4">
                            {i + 1}. {evaluator.name}
                            <span className="text-sm text-gray-400 font-bold">
                                {evaluator.email}
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 text-center my-10">
                    Todavia no hay evaluadores.
                    {isCreatorOfTheContest && (<>
                        Puedes agregar uno  {''}
                        <Link
                            to={`/dashboard/contests/${contestId}/evaluators/new`}
                            className="text-cyan-700 font-bold"
                        >
                            aqui.
                        </Link>
                    </>)}
                </p>
            )}

            {isCreatorOfTheContest && (
                <Link to={`/dashboard/contests/${contestId}/evaluators`} className="px-4 py-3 bg-cyan-700 hover:bg-cyan-800 text-white font-bold cursor-pointer transition-colors inline-block">
                    Ver Más
                </Link>
            )}
        </section>
    );
}
