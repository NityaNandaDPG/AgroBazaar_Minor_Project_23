import React from 'react';
import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const user = useSelector((state) => state);
    let location = useLocation();
    console.log(children);

    if(!user.isAuthenticated) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
    return children;
};

export default ProtectedRoute;