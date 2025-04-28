import { HTMLAttributes, PropsWithChildren } from "react";


export default function Subheading({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLParagraphElement>>) {
    return (
        <p {...props} className={`text-xl font-medium text-purple-100 mt-2 ${className}`}>
            {children}
        </p>
    )
}
