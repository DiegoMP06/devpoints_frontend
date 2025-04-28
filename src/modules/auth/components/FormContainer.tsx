import { HTMLAttributes, PropsWithChildren } from "react";

export default function FormContainer({children, className, ...props}: PropsWithChildren<HTMLAttributes<HTMLFormElement>>) {
    return (
        <form {...props} className={`mt-10 space-y-4 p-5 md:p-8 bg-white ${className}`}>
            {children}
        </form>
    )
}
