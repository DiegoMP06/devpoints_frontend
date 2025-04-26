import { PropsWithChildren } from "react";
import { Link } from "react-router";

type NavLinkProps = {
    to: string
}

export default function NavLink({ children, to }: PropsWithChildren<NavLinkProps>) {
    return (
        <Link to={to} className="text-white bg-purple-700 hover:bg-purple-800 font-bold py-3 px-4 cursor-pointer transition-colors inline-block">
            {children}
        </Link>
    )
}
