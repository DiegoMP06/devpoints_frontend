import DashboardProvider from "@/context/DashboardProvider";
import useApp from "@/hooks/useApp";
import useDashboard from "@/hooks/useDashboard";
import Header from "@/modules/app/components/Header";
import LoadingSpinner from "@/modules/app/components/LoadingSpinner";
import Sidebar from "@/modules/dashboard/components/Sidebar";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";

function DashboardProviderLayout() {
    const {contest, contestError, isContestLoading} = useDashboard();
    const { user, isAuthLoading } = useApp();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthLoading) return;

        if (!user) {
            navigate('/login');
            return
        }

        if (!user?.email_verified_at) {
            navigate('/email/verification-notification');
        }
    }, [user, isAuthLoading]);

    if(contestError) return <Navigate to="/404" />
    if(isContestLoading) return <LoadingSpinner />
    if(contest) return (
        <div className="flex flex-col md:h-screen md:overflow-hidden">
            <Header isStatic />

            <div className="flex-1 md:flex md:overflow-hidden">
                <Sidebar />

                <div className="overflow-y-auto flex-1">
                    <main className="mx-auto px-4 py-6 container">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    )
}

export default function DashboardLayout() {
    return (
        <DashboardProvider>
            <DashboardProviderLayout />
        </DashboardProvider>
    )
}
