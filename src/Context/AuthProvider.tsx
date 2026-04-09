import { AuthContext } from "./AuthContext";


const AuthProvider = ({children}) => {

    const authInfo = {

    }

    return (
        <AuthContext value={authInfo}>

        </AuthContext>
    );
};

export default AuthProvider;

