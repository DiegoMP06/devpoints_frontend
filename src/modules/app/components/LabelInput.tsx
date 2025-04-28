import { LabelHTMLAttributes, PropsWithChildren } from "react";


export default function LabelInput({ children, className, ...props }: PropsWithChildren<LabelHTMLAttributes<HTMLLabelElement>>) {
    return (
        <label className={`text-lg md:text-xl text-gray-600 block w-full font-bold ${className}`} {...props}>
            {children}
        </label>
    )
}
