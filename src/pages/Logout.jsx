import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear all stored user data
        localStorage.removeItem("user");

        alert("You have been logged out successfully.");
        navigate("/login");
    }, [navigate]);

    return null; // No UI, just performs logout
};

export default Logout;
