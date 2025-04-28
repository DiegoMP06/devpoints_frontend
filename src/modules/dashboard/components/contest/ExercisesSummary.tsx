import useDashboard from "@/hooks/useDashboard";
import { Exercise } from "@/types"
import { useMemo } from "react";
import { Link, useParams } from "react-router";

type ExercisesSummaryProps = {
    exercises: Exercise[]
}

export default function ExercisesSummary({ exercises }: ExercisesSummaryProps) {
    const { isCreatorOfTheContest } = useDashboard();
    const params = useParams();
    const contestId = params.contestId || '';
    const totalPoints = useMemo(() => exercises.reduce((total, exercise) => total + exercise.points, 0), [exercises]);

    return (
        <section className="max-w-2xl bg-white p-5 md:p-8 shadow-lg mx-auto my-10">
            <h2 className="text-2xl font-bold text-gray-600">
                Ejercicios:
            </h2>

            {exercises.length > 0 ? (
                <ul className="my-6 grid grid-cols-1 divide-gray-300 divide-y">
                    {exercises.map((exercise, i) => (
                        <li key={exercise.id} className="text-gray-600 font-bold p-2 flex items-center justify-between gap-4">
                            {i + 1}. {exercise.name}
                            <span className="text-sm text-gray-400 font-bold">
                                {exercise.points} puntos
                            </span>
                        </li>
                    ))}

                    <li className="text-gray-600 font-bold p-2 flex items-center justify-between gap-4">
                        Total:
                        <span className="text-sm text-gray-400 font-bold">
                            {totalPoints} puntos
                        </span>
                    </li>
                </ul>
            ) : (
                <p className="text-gray-500 text-center my-10">
                    Todavia no hay ejercicios.
                    {isCreatorOfTheContest && (<>
                        Puedes crear uno  {''}
                        <Link
                            to={`/dashboard/contests/${contestId}/exercises/new`}
                            className="text-cyan-700 font-bold"
                        >
                            aqui.
                        </Link>
                    </>)}
                </p>
            )}

            {isCreatorOfTheContest && (
                <Link to={`/dashboard/contests/${contestId}/exercises`} className="px-4 py-2 bg-cyan-700 hover:bg-cyan-800 text-white font-bold cursor-pointer transition-colors inline-block">
                    Ver Más
                </Link>
            )}
        </section>
    )
}
