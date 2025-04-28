import useContestSummary from "@/hooks/useContestSummary";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

export default function ContestSummaryView() {
    const {
        contest,
        chartData,
        teamScore,
        solvedTeamExercises,
        totalScore,
        totalParticipants,
    } = useContestSummary();

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );


    if (contest) return (
        <>
            <div className="mt-10 flex flex-col-reverse lg:flex-row gap-4 lg:items-start">
                <div className="lg:w-2/3 p-5 md:p-8 bg-white shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-600 mb-4">
                        Resumen:
                    </h2>

                    <div className="overflow-x-auto">
                        <div className="min-w-xl grid grid-cols-1 gap-6">
                            <div>
                                <Bar data={chartData('points', 'Puntos', 'rgba(0, 95, 120, 0.5)')} options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: 'top' as const,
                                        },
                                        title: {
                                            display: true,
                                            text: contest.name,
                                        },
                                        subtitle: {
                                            display: true,
                                            text: 'Puntaje de la competencia',
                                        },
                                    },
                                }} />
                            </div>

                            <div>
                                <Bar data={chartData('solved', 'Ejercicios Resueltos', 'rgba(130, 0, 219, 0.5)')} options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: 'top' as const,
                                        },
                                        title: {
                                            display: true,
                                            text: contest.name,
                                        },
                                        subtitle: {
                                            display: true,
                                            text: 'Número de ejercicios resueltos por equipo',
                                        },
                                    },
                                }} />
                            </div>

                            <div>
                                <Bar data={chartData('members', 'Miembros', 'rgba(0, 0, 0, 0.5)')} options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: 'top' as const,
                                        },
                                        title: {
                                            display: true,
                                            text: contest.name,
                                        },
                                        subtitle: {
                                            display: true,
                                            text: 'Número de miembros por equipo',
                                        },
                                    },
                                }} />
                            </div>
                        </div>
                        <div className="block mt-10">
                            <table className="w-full border-collapse">
                                <thead className="bg-gray-600">
                                    <tr>
                                        <th className="px-4 py-2 text-white">
                                            Equipo
                                        </th>
                                        <th className="px-4 py-2 text-white">
                                            Miembros
                                        </th>
                                        <th className="px-4 py-2 text-white">
                                            Ejercicios Resueltos
                                        </th>
                                        <th className="px-4 py-2 text-white">
                                            Puntaje
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contest.teams.map((team) => (
                                        <tr key={team.id} className="border-b border-white">
                                            <td className="px-4 py-2 text-center text-gray-600 bg-gray-100">
                                                {team.name}
                                            </td>
                                            <td className="px-4 py-2 text-center text-gray-600 bg-gray-100">
                                                {team.members.length}
                                            </td>
                                            <td className="px-4 py-2 text-center text-gray-600 bg-gray-100">
                                                {solvedTeamExercises(team.id)}
                                            </td>
                                            <td className="px-4 py-2 text-center text-gray-600 bg-gray-100">
                                                {teamScore(team.id)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="">
                                        <td className="px-4 py-2 text-gray-600 bg-gray-100 text-center font-bold">
                                            Total:
                                        </td>
                                        <td className="px-4 py-2 text-gray-600 bg-gray-100 text-center font-bold">
                                            {totalParticipants}
                                        </td>
                                        <td className="px-4 py-2 text-gray-600 bg-gray-100 text-center font-bold">
                                            {contest.exercises.length}
                                        </td>
                                        <td className="px-4 py-2 text-gray-600 bg-gray-100 text-center font-bold">
                                            {totalScore}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>


                <aside className="md:flex-1 p-5 md:p-8 bg-white shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-600 mb-4">
                        Creador:
                    </h2>

                    <div className="text-gray-600 font-bold p-2 flex items-center gap-4 mb-6">
                        <UserCircleIcon className="size-8 block" />
                        <p>
                            {contest.user.name}
                            <span className="text-xs text-gray-400 block">
                                {contest.user.email}
                            </span>
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-600 mb-4">
                        Evaluadores:
                    </h2>

                    {contest.evaluators.length > 0 ? (
                        <ul className="grid grid-cols-1 divide-gray-300 divide-y">
                            {contest.evaluators.map((evaluator) => (
                                <li key={evaluator.id} className="text-gray-600 font-bold p-2 flex items-center gap-4">
                                    <UserCircleIcon className="size-8 block" />
                                    <p>
                                        {evaluator.name}
                                        <span className="text-xs text-gray-400 block">
                                            {evaluator.email}
                                        </span>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="font-bold text-gray-500 text-center my-10">
                            No Hay evaluadores asignados
                        </p>
                    )}
                </aside>
            </div>
        </>
    )
}
