
import { Navigate, useLocation } from "react-router";

const AdminRoute = ({ children }) => {
    const user = true;
    const userRole = "admin"

    if (user && userRole === 'admin') {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace></Navigate>
};

export default AdminRoute;