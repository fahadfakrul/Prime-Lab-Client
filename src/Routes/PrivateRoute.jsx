import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";



const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation()
   if (loading){
    return <span className="loading loading-bars loading-lg text-center"></span>
   }
   if(user){
    return children;
   }
   return <Navigate to="/login" state={{from:location}} replace></Navigate>
   
};

export default PrivateRoute;