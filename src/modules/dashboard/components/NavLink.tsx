import { PropsWithChildren } from "react";
import { Link } from "react-router";

type NavLinkProps = {
    to: string
}

export default function NavLink({ children, to }: PropsWithChildren<NavLinkProps>) {
    return (
        <Link to={to} className="text-white bg-purple-700 hover:bg-purple-800 font-bold px-4 py-2 cursor-pointer transition-colors inline-block">
            {children}
        </Link>
    )
}
