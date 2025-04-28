import DashboardProvider from "@/context/DashboardProvider";
import useApp from "@/hooks/useApp";
import useDashboard from "@/hooks/useDashboard";
import Header from "app/components/Header";
import LoadingSpinner from "app/components/LoadingSpinner";
import MenuMobileLinks from "dashboard/components/MenuMobileLinks";
import Sidebar from "dashboard/components/Sidebar";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";

function DashboardProviderLayout() {
    const { contest, contestError, isContestLoading } = useDashboard();
    const { user, isAuthLoading, authError } = useApp();
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

    if (authError) return <Navigate to="/login" />
    if (contestError) return <Navigate to="/404" />
    if (isContestLoading || isAuthLoading) return <LoadingSpinner />
    if (contest && user) return (
        <>
            <div className="flex flex-col md:h-screen md:overflow-hidden">
                <Header isStatic />

                <div className="flex-1 md:flex md:overflow-hidden">
                    <Sidebar />

                    <div className="overflow-y-auto flex-1">
                        <main className="mx-auto px-2 py-6 container">
                            <Outlet />
                        </main>
                    </div>
                </div>
            </div>

            <MenuMobileLinks />
        </>
    )
}

export default function DashboardLayout() {
    return (
        <DashboardProvider>
            <DashboardProviderLayout />
        </DashboardProvider>
    )
}
