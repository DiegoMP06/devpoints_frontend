import useApp from "@/hooks/useApp";
import Header from "app/components/Header";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

export default function MainLayout() {
    const { user, isAuthLoading } = useApp();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isAuthLoading) return;
        if(location.pathname === '/') {
            return;
        }

        if (!user) {
            navigate('/login');
            return
        }

        if (!user?.email_verified_at) {
            navigate('/email/verification-notification');
        }
    }, [user, isAuthLoading]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="mx-auto px-4 py-6 container flex-1">
                <Outlet />
            </main>
        </div>
    )
}
