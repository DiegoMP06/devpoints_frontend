import useContest from "@/hooks/useContest"
import { ContestDetails } from "@/types"
import { PropsWithChildren, createContext } from "react"
import { KeyedMutator } from "swr"

export type DashboardContextProps = {
    contest: ContestDetails['data'][0] | undefined;
    isContestLoading: boolean;
    mutateContest: KeyedMutator<ContestDetails['data'][0] | undefined>;
    isCreatorOfTheContest: boolean;
    isEvaluatorOfTheContest: boolean;
    contestError: unknown;
    canEvaluate: boolean;
}

export const DashboardContext = createContext<DashboardContextProps>(null!)

export default function DashboardProvider({ children }: PropsWithChildren) {
    const {
        contest,
        isContestLoading,
        mutateContest,
        isCreatorOfTheContest,
        isEvaluatorOfTheContest,
        contestError,
        canEvaluate,
    } = useContest();

    return (
        <DashboardContext.Provider value={{
            contest,
            isContestLoading,
            mutateContest,
            isCreatorOfTheContest,
            isEvaluatorOfTheContest,
            contestError,
            canEvaluate,
        }}>
            {children}
        </DashboardContext.Provider>
    )
}
