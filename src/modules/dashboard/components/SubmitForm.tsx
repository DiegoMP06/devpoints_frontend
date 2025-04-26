import { InputHTMLAttributes } from "react";


export default function SubmitForm({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            type="submit"
            className={`bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-3 px-4 cursor-pointer transition-colors block w-full text-center disabled:opacity-25 disabled:cursor-not-allowed ${className}`}
            {...props}
        />
    )
}
