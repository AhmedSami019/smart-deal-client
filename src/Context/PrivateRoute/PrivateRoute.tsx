import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../AuthContext";
import Loading from "../../Pages/Loading/Loading";

const PrivateRoute = ({children}) => {
    const location = useLocation()

    const {user, loading} = useContext(AuthContext)
    if(loading){
        return <Loading></Loading>
    }

    if(user && user.email){
        return children
    }

    return <Navigate to={'/login'} state={location.pathname}></Navigate>
};

export default PrivateRoute;