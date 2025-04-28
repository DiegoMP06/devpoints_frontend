import { ChartBarIcon, CheckBadgeIcon, ClipboardDocumentCheckIcon, PaperClipIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { useParams } from "react-router";
import NavLinkSidebar from "./NavLinkSidebar";
import useDashboard from "@/hooks/useDashboard";


export default function Sidebar() {
    const { isCreatorOfTheContest } = useDashboard();
    const params = useParams();
    const contestId = params.contestId || '';

    return (
        <aside className="w-60 hidden md:flex bg-white border border-gray-300 shadow-lg flex-col">
            <NavLinkSidebar
                to={`/dashboard/contests/${contestId}`}
                icon={<ChartBarIcon className="size-6" />}
            >
                Detalles
            </NavLinkSidebar>

            {isCreatorOfTheContest && (
                <>
                    <NavLinkSidebar
                        to={`/dashboard/contests/${contestId}/exercises`}
                        icon={<PaperClipIcon className="size-6" />}
                    >
                        Ejercicios
                    </NavLinkSidebar>

                    <NavLinkSidebar
                        to={`/dashboard/contests/${contestId}/teams`}
                        icon={<UserGroupIcon className="size-6" />}
                    >
                        Equipos
                    </NavLinkSidebar>

                    <NavLinkSidebar
                        to={`/dashboard/contests/${contestId}/evaluators`}
                        icon={<CheckBadgeIcon className="size-6" />}
                    >
                        Evaluadores
                    </NavLinkSidebar>
                </>
            )}

            <NavLinkSidebar
                to={`/dashboard/contests/${contestId}/assessment`}
                icon={<ClipboardDocumentCheckIcon className="size-6" />}
            >
                Evaluar
            </NavLinkSidebar>
        </aside>
    )
}
