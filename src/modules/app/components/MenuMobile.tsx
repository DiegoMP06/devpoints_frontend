import useApp from "@/hooks/useApp";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import Logo from "./Logo";
import { Link, useLocation } from "react-router";

export default function MenuMobile() {
    const { menuMobile, setMenuMobile } = useApp();
    const location = useLocation();

    useEffect(() => {
        setMenuMobile(false);
    }, [location.pathname]);

    return (
        <Transition appear show={menuMobile} as={Fragment}>
            <Dialog as="div" className="relative z-10 md:hidden" onClose={() => setMenuMobile(false)}>
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
                        <DialogPanel className="max-w-xs w-2/3 transform overflow-y-auto bg-white p-6">
                            <div className="max-w-30 mx-auto">
                                <Logo />
                            </div>

                            <nav className="">
                                <Link to="/">
                                    Inicio
                                </Link>
                                
                                <Link to="/dashboard">
                                    Dashboard
                                </Link>
                            </nav>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    )
}
