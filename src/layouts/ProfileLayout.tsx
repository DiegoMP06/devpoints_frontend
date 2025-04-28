import useApp from "@/hooks/useApp";
import LoadingSpinner from "@/modules/app/components/LoadingSpinner";
import { LockClosedIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Link, Navigate, Outlet } from "react-router";

export default function ProfileLayout() {
    const { user, isAuthLoading, authError } = useApp();

    if (isAuthLoading) return <LoadingSpinner />
    if (authError) return <Navigate to="/login" />
    if (user) return (
        <>
            <nav className="hidden md:flex items-center mt-10 max-w-2xl w-full mx-auto">
                <Link to="/profile" className="border-b-2 border-gray-400 text-gray-400 hover:text-purple-700 hover:border-purple-700 transition-colors px-4 py-2 flex gap-2 text-lg font-bold flex-1 justify-center">
                    <UserCircleIcon className="size-6" />
                    Perfil
                </Link>
                <Link to="/profile/password" className="border-b-2 border-gray-400 text-gray-400 hover:text-purple-700 hover:border-purple-700 transition-colors px-4 py-2 flex gap-2 text-lg font-bold flex-1 justify-center">
                    <LockClosedIcon className="size-6" />
                    Contraseña
                </Link>
            </nav>

            <div className="fixed bottom-0 left-0 right-0 bg-purple-700/60 hover:bg-purple-700 transition-colors z-40">
                <nav className="flex md:hidden items-center max-w-md w-full mx-auto">
                    <Link title="Perfil" to="/profile" className="flex-1 hover:bg-purple-800 text-white text-xs font-bold transition-colors px-4 py-2 flex gap-2 items-center justify-center">
                        <UserCircleIcon className="size-6" />
                        <span className="hidden sm:block">
                            Perfil
                        </span>
                    </Link>
                    <Link title="Contraseña" to="/profile/password" className="flex-1 hover:bg-purple-800 text-white text-xs font-bold transition-colors px-4 py-2 flex gap-2 items-center justify-center">
                        <LockClosedIcon className="size-6" />
                        <span className="hidden sm:block">
                            Contraseña
                        </span>
                    </Link>
                </nav>
            </div>

            <div className="mb-20">
                <Outlet />
            </div>
        </>
    )
}
