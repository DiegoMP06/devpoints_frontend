import ContestService from "@/services/ContestService";
import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams } from "react-router";
import EditContestForm from "dashboard/components/forms/EditContestForm";
import LoadingSpinner from "@/modules/app/components/LoadingSpinner";

export default function EditContestView() {
    const params = useParams();
    const contestId = params.contestId || '';

    const { data, isLoading, isError } = useQuery({
        queryKey: ['edit-contest', contestId],
        queryFn: () => ContestService.getEditContest({ id: Number(contestId) }),
    });

    if (isError) return <Navigate to="/404" />
    if (isLoading) return <LoadingSpinner />
    if (data) return <EditContestForm contest={data} />
}
