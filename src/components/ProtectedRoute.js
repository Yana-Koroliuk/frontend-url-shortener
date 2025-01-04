import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../api/auth";
import Paths from "../config/paths";

const ProtectedRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to={Paths.UNAUTHORIZED} replace />;
};

export default ProtectedRoute;
