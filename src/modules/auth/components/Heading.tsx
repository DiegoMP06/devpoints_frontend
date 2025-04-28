import { HTMLAttributes, PropsWithChildren } from "react";

export default function Heading({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) {
    return (
        <h1 {...props} className={`text-4xl font-bold text-white ${className}`}>
            {children}
        </h1>
    )
}
