import useApp from "@/hooks/useApp";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { Fragment, PropsWithChildren, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import LinkMobileMenu from "./LinkMobileMenu";
import Logo from "./Logo";
import { useMutation } from "@tanstack/react-query";
import AuthService from "@/services/AuthService";
import { toast } from "react-toastify";

export default function MenuMobile({ children }: PropsWithChildren) {
    const { menuMobile, setMenuMobile, user, mutateAuth } = useApp();
    const location = useLocation();
    const navigate = useNavigate();

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
        setMenuMobile(false);
    }, [location.pathname]);

    const isHomePage = useMemo(() => location.pathname === '/', [location.pathname]);
    return (
        <Transition appear show={menuMobile} as={Fragment}>
            <Dialog as="div" className="relative md:hidden z-50" onClose={() => setMenuMobile(false)}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/40" />
                </TransitionChild>

                <div className="fixed inset-0 flex justify-end">
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <DialogPanel className="max-w-xs w-2/3 transform overflow-y-auto bg-white py-6">
                            <div className="max-w-30 mx-auto">
                                <Logo />
                            </div>

                            <nav className="grid grid-cols-1 divide-gray-300 divide-y mt-10">
                                {user ? (<>
                                    {isHomePage ? (<>
                                        <LinkMobileMenu to="/dashboard">
                                            Dashboard
                                        </LinkMobileMenu>
                                    </>) : (<>
                                        <LinkMobileMenu to="/">
                                            Inicio
                                        </LinkMobileMenu>
                                    </>)}

                                    {children}

                                    <LinkMobileMenu to="/profile">
                                        Perfil
                                    </LinkMobileMenu>

                                    <LinkMobileMenu to="/favorites">
                                        Favoritos
                                    </LinkMobileMenu>

                                    <button
                                        onClick={() => logout()}
                                        type="button"
                                        className="text-gray-600 font-bold py-2 px-4 cursor-pointer hover:bg-gray-100 border-l hover:border-l-4 transition-all border-gray-300 text-start"
                                    >
                                        Cerrar Sesion
                                    </button>
                                </>) : (<>
                                    <LinkMobileMenu to="/login">
                                        Iniciar Sesion
                                    </LinkMobileMenu>

                                    <LinkMobileMenu to="/register">
                                        Registrarse
                                    </LinkMobileMenu>
                                </>)}
                            </nav>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    )
}
