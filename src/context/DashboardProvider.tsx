import useContest from "@/hooks/useContest"
import { Contest } from "@/types"
import { PropsWithChildren, createContext } from "react"
import { KeyedMutator } from "swr"

export type DashboardContextProps = {
    contest: Contest | undefined;
    isContestLoading: boolean;
    mutateContest: KeyedMutator<Contest | undefined>;
    isCreatorOfTheContest: boolean;
    isEvaluatorOfTheContest: boolean;
    contestError: unknown;
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
    } = useContest();

    return (
        <DashboardContext.Provider value={{
            contest,
            isContestLoading,
            mutateContest,
            isCreatorOfTheContest,
            isEvaluatorOfTheContest,
            contestError,
        }}>
            {children}
        </DashboardContext.Provider>
    )
}
