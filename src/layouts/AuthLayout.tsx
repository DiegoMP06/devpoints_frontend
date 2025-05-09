import useApp from "@/hooks/useApp";
import LoadingSpinner from "@/modules/app/components/LoadingSpinner";
import AppService from "@/services/AppService";
import { useQuery } from "@tanstack/react-query";
import Logo from "app/components/Logo";
import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";

export default function AuthLayout() {
    const { user, isAuthLoading } = useApp();

    const authorizedRoutes = [
        '/login',
        '/register',
        '/forgot-password',
        '/reset-password'
    ];

    const location = useLocation();
    const navigate = useNavigate();

    const { isError, isLoading } = useQuery({
        queryKey: ['csrf'],
        queryFn: AppService.csrf,
    })

    useEffect(() => {
        if (isAuthLoading) return;

        if (authorizedRoutes.some(route => location.pathname.includes(route)) && user) {
            navigate('/dashboard');
            return
        }

        if (!authorizedRoutes.some(route => location.pathname.includes(route)) && !user) {
            navigate('/login');
            return
        }

        if (!authorizedRoutes.some(route => location.pathname.includes(route)) && user && user?.email_verified_at) {
            navigate('/dashboard');
        }
    }, [user, isAuthLoading, location.pathname]);

    if (isLoading) return <LoadingSpinner />
    if (!isError) return (
        <>
            <div className="min-h-screen flex flex-col">
                <div className="max-w-xl mx-auto my-20 px-4 flex-0">
                    <div className="flex items-center justify-center">
                        <Link to="/">
                            <Logo />
                        </Link>
                    </div>
                </div>

                <div className="bg-purple-700 flex-1 flex flex-col">
                    <main className="max-w-xl mx-auto my-10 px-2 flex-1">
                        <Outlet />
                    </main>

                    <footer className="flex-0 pb-10 mt-10">
                        <p className="text-center text-purple-50 px-4 max-w-xl mx-auto">
                            &copy; {new Date().getFullYear()} DevPoints. All rights reserved.
                        </p>
                    </footer>
                </div>
            </div>
        </>
    )
}
