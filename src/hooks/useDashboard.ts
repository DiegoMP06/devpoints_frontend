import { DashboardContext } from "@/context/DashboardProvider";
import { useContext } from "react";

export default function useDashboard() {
    const context = useContext(DashboardContext);

    if (!context) {
        throw new Error("useApp must be used within a DashboardProvider");
    }

    return context;
}
