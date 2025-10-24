import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const user = localStorage.getItem("user");

    // If no user is found in localStorage, redirect to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Otherwise, render the child component
    return children;
};

export default ProtectedRoute;
