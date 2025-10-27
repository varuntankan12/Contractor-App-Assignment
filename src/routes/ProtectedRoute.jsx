import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if any user is logged in
    const isAnyUserLoggedIn = storedUsers.some(user => user.isLoggedIn === true);

    // If no logged-in user, redirect to login
    if (!isAnyUserLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    // Otherwise, allow access
    return children;
};

export default ProtectedRoute;
