import ExerciseService from "@/services/ExerciseService";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router"
import LoadingSpinner from "app/components/LoadingSpinner";
import EditExerciseForm from "dashboard/components/forms/EditExerciseForm";


export default function EditExerciseView() {
    const params = useParams();
    const contestId = params.contestId || '';
    const exerciseId = params.exerciseId || '';

    const { data, isLoading, isError } = useQuery({
        queryKey: ['edit-exercise', exerciseId],
        queryFn: () => ExerciseService.getEditExercise({
            contestId: Number(contestId),
            exerciseId: Number(exerciseId)
        }),
    });

    if (isError) return <Navigate to="/404" />;
    if (isLoading) return <LoadingSpinner />;
    if (data) return <EditExerciseForm exercise={data} />
}
