import useDashboard from "@/hooks/useDashboard";
import Heading from "dashboard/components/Heading";
import NavLink from "dashboard/components/NavLink";
import NavLinkContainer from "dashboard/components/NavLinkContainer";
import ExercisesSummary from "dashboard/components/contest/ExercisesSummary";
import TeamsSummary from "dashboard/components/contest/TeamsSummary";
import EvaluatorsSummary from "../../components/contest/EvaluatorsSummary";

export default function ContestDetailsView() {
    const { contest } = useDashboard();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    if (contest) return (
        <>
            <Heading className="flex md:items-center flex-col md:flex-row gap-4">
                <span className="inline-block">
                    <img
                        alt={`Logo de la competencia ${contest.name}`}
                        src={`${BACKEND_URL}/storage/contests/${contest.image}`}
                        className="inline-block size-16 md:size-14 rounded-full ring-2 ring-white"
                        width={100}
                        height={100}
                    />
                </span>
                <span className="flex-1">
                    {contest.name} &gt; Detalles
                </span>
            </Heading>

            <NavLinkContainer>
                <NavLink to="/dashboard">
                    Volver a Dashboard
                </NavLink>
            </NavLinkContainer>

            <ExercisesSummary exercises={contest.exercises} />

            <TeamsSummary teams={contest.teams} />

            <EvaluatorsSummary evaluators={contest.evaluators} />
        </>
    )
}
