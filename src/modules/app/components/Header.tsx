import useApp from "@/hooks/useApp";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars4Icon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Logo from "./Logo";
import { useMutation } from "@tanstack/react-query";
import AuthService from "@/services/AuthService";
import { toast } from "react-toastify";

type HeaderProps = {
    isStatic?: boolean
}

export default function Header({ isStatic }: HeaderProps) {
    const { user, setMenuMobile, mutateAuth } = useApp();
    const navigate = useNavigate();
    const header = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
    const location = useLocation();

    const { mutate: logout } = useMutation({
        mutationFn: AuthService.logout,
        onSuccess() {
            mutateAuth(undefined);
            navigate("/login");
        },
        onError(error) {
            toast.error(error.message);
        },
    });

    useEffect(() => {
        header.current?.focus();

        if (!header.current) return;
        const rectHeader = header.current.getBoundingClientRect();
        setHeight(rectHeader.height);

        window.onresize = () => {
            if (!header.current) return
            const rectHeader = header.current.getBoundingClientRect();

            setHeight(rectHeader.height);
        }
    }, []);

    const isHomePage = useMemo(() => location.pathname === '/', [location.pathname]);

    return (
        <>
            <header ref={header} className={`fixed ${isStatic ? 'md:static' : 'z-40'} top-0 right-0 left-0 bg-white shadow-lg px-4 py-2`}>
                <div className="container mx-auto flex justify-between gap-4 items-center">
                    <Link to={user ? '/dashboard' : '/'} className="w-22 h-11 block">
                        <Logo />
                    </Link>

                    <button
                        onClick={() => setMenuMobile(true)}
                        type="button"
                        className="block md:hidden p-1 rounded hover:bg-gray-100 transition-colors cursor-pointer"
                        title="Menu"
                    >
                        <Bars4Icon className="size-8 fill-gray-600" />
                    </button>

                    <nav className="gap-4 hidden md:flex items-center">
                        {user && (<>
                            {isHomePage ? (<>
                                <Link to="/dashboard" className="text-gray-600 font-bold">
                                    Dashboard
                                </Link>
                            </>) : (<>
                                <Link to="/" className="text-gray-600 font-bold">
                                    Inicio
                                </Link>
                            </>)}

                            <Menu>
                                <MenuButton className="cursor-pointer hover:bg-gray-100 transition-colors rounded flex gap-2 items-center px-4 py-1">
                                    <UserCircleIcon className="size-8 fill-gray-600" />
                                    <div>
                                        <p className="text-sm font-bold text-gray-600">
                                            {user.name}
                                        </p>
                                        <p className="text-xs font-bold text-gray-400">
                                            {user.email}
                                        </p>
                                    </div>
                                </MenuButton>

                                <MenuItems
                                    transition
                                    anchor="bottom end"
                                    className="bg-white w-52 origin-top-right rounded-xl border border-gray-300 p-1 transition z-50"
                                >
                                    <MenuItem>
                                        <Link to="/profile" className="group block hover:bg-gray-100 transition-colors text-start text-gray-600 w-full gap-2 rounded-lg px-3 py-1.5">
                                            Perfil
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link to="/favorites" className="group block hover:bg-gray-100 transition-colors text-start text-gray-600 w-full gap-2 rounded-lg px-3 py-1.5">
                                            Favoritos
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <button
                                            onClick={() => logout()}
                                            type="button"
                                            className="group block hover:bg-gray-100 transition-colors text-start text-gray-600 w-full gap-2 rounded-lg px-3 py-1.5"
                                        >
                                            Cerrar Sesión
                                        </button>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </>)}

                        {!user && (<>
                            <Link to="/login" className="text-gray-600 font-bold">
                                Iniciar Sesión
                            </Link>
                            <Link to="/register" className="text-gray-600 font-bold">
                                Registrarse
                            </Link>
                        </>)}
                    </nav>
                </div>
            </header>

            <div style={{ height: `${height}px` }} className={`${isStatic ? 'md:hidden' : ''}`} />
        </>

    )
}
