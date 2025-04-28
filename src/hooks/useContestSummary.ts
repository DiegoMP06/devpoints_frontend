import { ContestSummaryContext } from "@/context/ContestSummaryProvider";
import { useContext } from "react";

export default function useContestSummary() {
    const context = useContext(ContestSummaryContext);

    if (!context) {
        throw new Error("useApp must be used within a ContestSummaryProvider");
    }

    return context;
}
