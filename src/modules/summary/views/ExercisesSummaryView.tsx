import "react-quill-new/dist/quill.bubble.css";
import ReactQuill from "react-quill-new";
import useContestSummary from "@/hooks/useContestSummary"

export default function ExercisesSummaryView() {
    const { contest } = useContestSummary();

    if (contest) return (
        <div className="bg-white p-5 md:p-8 shadow-lg mt-10 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-600">
                Ejercicios:
            </h2>

            {contest.exercises.length > 0 ? (
                <ul className="mt-8 grid grid-cols-1 divide-gray-300 divide-y">
                    {contest.exercises.map((exercise) => (
                        <li key={exercise.id} className="space-y-2 p-2">
                            <div className="flex gap-4 justify-between">
                                <h3 className="text-gray-600 font-bold">
                                    {exercise.name}
                                </h3>

                                <p className="text-gray-400 font-bold text-sm">
                                    {exercise.points} Puntos
                                </p>
                            </div>

                            <div>
                                <ReactQuill
                                    value={exercise.description}
                                    readOnly
                                    theme="bubble"
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-400 font-bold my-10">
                    Todavia no hay ejercicios
                </p>
            )}
        </div>
    )
}
