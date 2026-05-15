import { useContext } from "react";
import { useLocation } from "react-router";
import { AuthContext } from "../AuthContext";

const PrivateRoute = ({children}) => {
    const location = useLocation()

    const {user, loading} = useContext(AuthContext)
    if(loading)
};

export default PrivateRoute;