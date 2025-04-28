import { PropsWithChildren } from "react";

export default function InputContainer({ children }: PropsWithChildren) {
    return (
        <div className="block space-y-2">
            {children}
        </div>
    )
}
