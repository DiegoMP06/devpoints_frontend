import ContestService from "@/services/ContestService";
import { useParams } from "react-router";
import useSWR from "swr";
import useApp from "./useApp";
import { useMemo } from "react";

export default function useContest() {
    const { user } = useApp();
    const params = useParams();
    const contestId = params.contestId || "";

    const {
        data: contest,
        isLoading: isContestLoading,
        mutate: mutateContest,
        error: contestError,
    } = useSWR(
        `/contests/${contestId}`,
        async () => {
            const data = await ContestService.getContestDetails({
                id: Number(contestId),
            });
            return data;
        },
        {
            refreshInterval: 5000,
        }
    );

    const isCreatorOfTheContest = useMemo(
        () => user?.id === contest?.user_id,
        [user, contest]
    );
    const isEvaluatorOfTheContest = useMemo(
        () =>
            Boolean(
                user?.id === contest?.user_id ||
                    contest?.evaluators.some(
                        (evaluator) => evaluator.id === user?.id
                    )
            ),
        [user, contest]
    );

    const canEvaluate = useMemo(() => {
        const startedAt = new Date(contest?.started_at || "").getTime();
        const endedAt = new Date(contest?.ended_at || "").getTime();
        const now = Date.now();
        return startedAt <= now && endedAt >= now && !contest?.is_ended;
    }, [contest]);

    return {
        contest,
        isContestLoading,
        mutateContest,
        contestError: (contestError as unknown),
        isCreatorOfTheContest,
        isEvaluatorOfTheContest,
        canEvaluate,
    };
}
