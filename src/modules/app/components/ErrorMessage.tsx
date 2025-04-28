import { PropsWithChildren } from "react";

export default function ErrorMessage({ children }: PropsWithChildren) {
    return (
        <p className="text-red-600 bg-red-100 py-2 px-4 text-center text-xs font-bold uppercase w-full">{children}</p>
    )
}
