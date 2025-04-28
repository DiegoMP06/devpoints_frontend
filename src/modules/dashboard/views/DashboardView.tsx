import ContestService from "@/services/ContestService";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "app/components/LoadingSpinner";
import Heading from "dashboard/components/Heading";
import NavLink from "dashboard/components/NavLink";
import NavLinkContainer from "dashboard/components/NavLinkContainer";
import { Link } from "react-router";
import ContestDashboardItem from "../components/contest/ContestDashboardItem";
import useApp from "@/hooks/useApp";
import Pagination from '../../app/components/Pagination';

export default function DashboardView() {
    const { user } = useApp();
    const { data, isLoading } = useQuery({
        queryKey: ['contests', user?.id],
        queryFn: ContestService.getContestsUser,
    });

    if (isLoading) return <LoadingSpinner />
    if (data) return (
        <>
            <Heading>
                Competencias
            </Heading>

            <NavLinkContainer>
                <NavLink to="/dashboard/contests/new">
                    Nueva Competencia
                </NavLink>
            </NavLinkContainer>

            {data.data.length > 0 ?
                <div className="grid lg:grid-cols-2 gap-4 mt-10">
                    {data.data.map((contest) => (
                        <ContestDashboardItem contest={contest} key={contest.id} />
                    ))}
                </div>
                :
                <p className="text-center text-gray-500 mt-20 text-lg">
                    Todavia no has creado ninguna competencia, {''}
                    <Link to="/dashboard/contests/new" className="text-cyan-700">
                        Ahora Crea una.
                    </Link>
                </p>
            }

            <Pagination meta={data.meta} />
        </>
    )
}
