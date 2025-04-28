import { PropsWithChildren } from "react";
import { Link } from "react-router";

type LinkMobileMenuProps = {
    to: string;
}

export default function LinkMobileMenu({ children, to }: PropsWithChildren<LinkMobileMenuProps>) {
    return (
        <Link to={to} className="text-gray-600 font-bold py-2 px-4 cursor-pointer hover:bg-gray-100 border-l hover:border-l-4 transition-all border-gray-300">
            {children}
        </Link>
    )
}
