import { createContext, FC, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";

export interface AuthState {
    authenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

type Props = {

}

export const AuthProvider: FC<PropsWithChildren<Props>> = 
    ({ children }) => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("AUTH_TOKEN");
        setAuthenticated(!!token && token !== '');
    }, []);

    const value = useMemo(() => ({
        authenticated,
        login: (token: string)=> {
            setAuthenticated(true);
            localStorage.setItem("AUTH_TOKEN", token);
            
        },
        logout: () => {
            setAuthenticated(false);
            localStorage.removeItem("AUTH_TOKEN");
        }
    }), [authenticated])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

const useAuth = (): AuthState => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
};

export default useAuth;
