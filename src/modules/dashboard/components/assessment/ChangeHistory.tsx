import { Team } from "@/types"
import { formatDate } from "@/utils";

type ChangeHistoryProps = {
    teams: Team[];
}

export default function ChangeHistory({ teams }: ChangeHistoryProps) {
    return (
        <section className="max-w-2xl bg-white p-8 shadow-lg mx-auto my-10">
            <h2 className="text-2xl font-bold text-gray-600">
                Historial de Cambios:
            </h2>

            <ul className="my-6 grid grid-cols-1 divide-gray-300 divide-y">
                {teams.map((team) => (
                    <li key={team.id} className="px-4 py-2">
                        <p className="text-xl font-bold text-gray-600">
                            {team.name}
                        </p>

                        {team.assessments.length > 0 ? (
                            <div className="mt-2 grid grid-cols-1 space-y-6">
                                {team.assessments.map((assessment, i) => (
                                    <div key={assessment.id} className="space-y-2">
                                        <h3 className="font-bold text-gray-500">
                                            {i + 1}. {assessment.exercise.name}
                                        </h3>

                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="flex-1 bg-green-50 p-2 border border-green-300 space-y-1">
                                                <p className="text-green-700 font-bold text-sm">
                                                    {assessment.created_by.name} creo la evaluación
                                                </p>
                                                <p className="text-xs font-bold text-green-700">
                                                    Fecha: {formatDate(assessment.created_at)}
                                                </p>
                                            </div>

                                            {assessment.deleted_at && (
                                                <div className="flex-1 bg-red-50 p-2 border border-red-300 space-y-1">
                                                    <p className="text-red-700 font-bold text-sm">
                                                        {assessment.deleted_by?.name} elimino la evaluación
                                                    </p>
                                                    <p className="text-xs font-bold text-red-700">
                                                        {formatDate(assessment.deleted_at)}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 my-16">
                                No se han realizado cambios en la evaluación
                            </p>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    )
}
