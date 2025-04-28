import AppService from "@/services/AppService";
import useSWR from "swr";

export default function useAuth() {
    const {
        data: user,
        isLoading: isAuthLoading,
        error,
        mutate: mutateAuth,
        error: authError,
    } = useSWR("/user", async () => {
        const user = await AppService.user();
        return user;
    });

    return {
        user,
        isAuthLoading,
        error,
        mutateAuth,
        authError: authError as unknown,
    };
}
