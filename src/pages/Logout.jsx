import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const usersData = JSON.parse(localStorage.getItem("users")) || [];

        // Set all users' isLoggedIn to false
        const updatedUsers = usersData.map(user => ({
            ...user,
            isLoggedIn: false,
        }));

        localStorage.setItem("users", JSON.stringify(updatedUsers));

        alert("You have been logged out successfully.");
        setIsLoggedIn(false);
        navigate("/login");
    }, [navigate]);


    return null; // No UI, just performs logout
};

export default Logout;
