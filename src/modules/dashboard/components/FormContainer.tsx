import { HTMLAttributes, PropsWithChildren } from "react";

export default function FormContainer({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLFormElement>>) {
    return (
        <form className={`max-w-2xl bg-white p-5 md:p-8 shadow-lg mx-auto space-y-4 ${className}`} {...props}>
            {children}
        </form>
    )
}
