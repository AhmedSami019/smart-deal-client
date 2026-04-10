import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";


const AuthProvider = ({ children }: { children: ReactNode }) => {

    const authInfo  = {

    } 

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;

