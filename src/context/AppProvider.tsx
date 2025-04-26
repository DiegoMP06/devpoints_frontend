import useAuth from "@/hooks/useAuth";
import { User } from "@/types";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from "react"
import { KeyedMutator } from "swr";

export type AppContextProps = {
    user: User | undefined,
    isAuthLoading: boolean,
    mutateAuth: KeyedMutator<User | undefined>,
    setMenuMobile: Dispatch<SetStateAction<boolean>>
    menuMobile: boolean
};

export const AppContext = createContext<AppContextProps>(null!)

export const AppProvider = ({ children }: PropsWithChildren) => {
    const {
        user,
        isAuthLoading,
        mutateAuth,
    } = useAuth();

    const [menuMobile, setMenuMobile] = useState(false);

    return (
        <AppContext.Provider value={{
            user,
            isAuthLoading,
            mutateAuth,
            menuMobile,
            setMenuMobile,
        }}>
            {children}
        </AppContext.Provider>
    );

}