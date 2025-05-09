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
    isPending: boolean;
    isEnded: boolean;
    isActive: boolean;
    clasification: {
        id: number;
        name: string;
        solved: number;
        points: number;
        last_assessment: string | undefined;
    }[] | undefined
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

    const isPending = useMemo(() => {
        const startedAtTime = new Date(contest?.started_at || '').getTime();
        return startedAtTime >= Date.now();
    }, [contest]);


    const isActive = useMemo(() => {
        const startedAtTime = new Date(contest?.started_at || '').getTime();
        const endedAtTime = new Date(contest?.ended_at || '').getTime();
        return startedAtTime < Date.now() && endedAtTime > Date.now();
    }, [contest]);

    const isEnded = useMemo(() => {
        const endedAtTime = new Date(contest?.ended_at || '').getTime();
        return endedAtTime <= Date.now();
    }, [contest]);

    const clasification = useMemo(() => {
        const teamsData = contest?.teams.map((team) => ({
            id: team.id,
            name: team.name,
            solved: solvedTeamExercises(team.id),
            points: teamScore(team.id),
            last_assessment: team.assessments.filter((assessment) => !assessment.deleted_at).at(-1)?.created_at,
        }));

        teamsData?.sort((a, b) => {
            const assesmentA = a.last_assessment ? new Date(a.last_assessment).getTime() : 0;
            const assesmentB = b.last_assessment ? new Date(b.last_assessment).getTime() : 0;

            if (a.points < b.points) return 1;
            if (a.points > b.points) return -1;
            if (assesmentA < assesmentB) return -1;
            if (assesmentA > assesmentB) return 1;
            return 0;
        })

        return teamsData;
    }, [contest, solvedTeamExercises, teamScore]);

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
            isPending,
            isEnded,
            isActive,
            clasification,
        }}>
            {children}
        </ContestSummaryContext.Provider>
    )
}
