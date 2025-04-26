import { AppContext } from "@/context/AppProvider";
import { useContext } from "react";

export default function useApp() {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useApp must be used within a AppProvider");
    }

    return context
}