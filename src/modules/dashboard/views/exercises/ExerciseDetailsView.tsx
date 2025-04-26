import { useParams } from 'react-router';
import ExerciseDetails from "dashboard/components/exercise/ExerciseDetails";

export default function ExerciseDetailsView() {
    const params = useParams()
    const contestId = params.contestId || ''

    
    return <ExerciseDetails urlToReturn={`/dashboard/contests/${contestId}/exercises`} />
}


