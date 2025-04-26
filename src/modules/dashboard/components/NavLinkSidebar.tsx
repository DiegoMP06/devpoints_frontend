import { PropsWithChildren, ReactNode } from "react";
import { Link } from "react-router";

export default function NavLinkSidebar({ children, icon, to }: PropsWithChildren<{ icon: ReactNode, to: string }>) {
    return (
        <Link to={to} className="flex items-center gap-2 text-cyan-700 hover:bg-gray-100 px-4 py-3 rounded font-bold">
            {icon}
            {children}
        </Link>
    )
}
