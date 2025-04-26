import { useParams } from "react-router";
import TeamDetails from "dashboard/components/teams/TeamDetails";

export default function TeamDetailsView() {
    const params = useParams();
    const contestId = params.contestId || '';

    return <TeamDetails
        urlToReturn={`/dashboard/contests/${contestId}/teams`}
    />
}
