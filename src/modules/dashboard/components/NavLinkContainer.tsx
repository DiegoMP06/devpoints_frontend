import { PropsWithChildren } from "react";

export default function NavLinkContainer({ children }: PropsWithChildren) {
    return (
        <div className="mt-6">
            {children}
        </div>
    )
}
