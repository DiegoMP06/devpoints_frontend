import useApp from "@/hooks/useApp"
import GuestService from "@/services/GuestService"
import { Contest, Team } from "@/types"
import { ChartData } from "chart.js"
import { PropsWithChildren, createContext, useMemo } from "react"
import { useParams } from "react-router"
import useSWR, { KeyedMutator } from "swr"

type KeysChartData = 'points' | 'solved' | 'members'

export type ContestSummaryContextProps = {
    contest: Contest | undefined;
    isContestLoading: boolean;
    mutateContest: KeyedMutator<Contest | undefined>;
    canAssessment: boolean;
    contestError: unknown;
    chartData: (key: KeysChartData, label: string, backgroundColor: string) => ChartData<"bar", number[], string>;
    teamScore: (teamId: Team["id"]) => number;
    solvedTeamExercises: (teamId: Team["id"]) => number;
    totalScore: number;
    totalParticipants: number;
}


export const ContestSummaryContext = createContext<ContestSummaryContextProps>(null!)

export default function ContestSummaryProvider({ children }: PropsWithChildren) {
    const { user } = useApp();
    const params = useParams();
    const contestId = params.contestId || '';

    const {
        data: contest,
        isLoading: isContestLoading,
        mutate: mutateContest,
        error: contestError,
    } = useSWR(
        `/contests/${contestId}/summary`,
        async () => {
            const data = await GuestService.getContestSummary({
                contestId: Number(contestId),
            });
            return data;
        },
        {
            refreshInterval: 3000,
        }
    );

    const teamScore = useMemo(() => (teamId: Team['id']) => {
        const team = contest?.teams.find((team) => team.id === teamId);
        if (!team) return 0;

        return team.assessments.reduce((total, assessment) =>
            assessment.deleted_at ? total : (total + assessment.exercise.points), 0)
    }, [contest]);

    const solvedTeamExercises = useMemo(() => (teamId: Team['id']) => {
        const team = contest?.teams.find((team) => team.id === teamId);
        if (!team) return 0;

        return team.assessments.reduce((total, assessment) =>
            assessment.deleted_at ? total : (total + 1), 0)
    }, [contest]);

    const totalScore = useMemo(() =>
        contest?.exercises.reduce((total, exercise) => total + exercise.points, 0) || 0, [contest]);

    const totalParticipants = useMemo(() =>
        contest?.teams.reduce((total, team) => team.members.length + total, 0) || 0, [contest]);

    const chartData = useMemo(() => (key: KeysChartData, label: string, backgroundColor: string) => {
        const labels = contest?.teams.map((team) => team.name) || [];
        const data: { [key: string]: number }[] = contest?.teams.map(
            (team) => ({
                points: key === 'points' ? teamScore(team.id) : 0,
                solved: key === 'solved' ? solvedTeamExercises(team.id) : 0,
                members: key === 'members' ? team.members.length : 0
            })
        ) || [];

        return {
            labels,
            datasets: [
                {
                    label,
                    data: data.map((team) => team[key]),
                    backgroundColor,
                },
            ]
        }
    }, [contest, teamScore]);

    const canAssessment = useMemo(
        () =>
            Boolean(
                user?.id === contest?.user_id ||
                contest?.evaluators.some(
                    (evaluator) => evaluator.id === user?.id
                )
            ),
        [user, contest]
    );

    return (
        <ContestSummaryContext.Provider value={{
            contest,
            isContestLoading,
            mutateContest,
            contestError,
            canAssessment,
            chartData,
            teamScore,
            solvedTeamExercises,
            totalScore,
            totalParticipants,
        }}>
            {children}
        </ContestSummaryContext.Provider>
    )
}
