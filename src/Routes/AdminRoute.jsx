import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";


const AdminRoute = ({children}) => {
    const {user, loading} = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation()
    if (loading || isAdminLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    if(user && isAdmin)
        return children;

    return <Navigate to="/" state={{from:location}} replace></Navigate>
};

export default AdminRoute;