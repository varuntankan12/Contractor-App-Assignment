import { useState } from "react";
import Header from "./components/Header";
import AppRoutes from "./routes/AppRoutes";


function App() {

    function checkIfAnyUserLoggedIn() {
        const usersData = localStorage.getItem('users');
        if (!usersData) return false;
        const users = JSON.parse(usersData);
        return users.some(user => user.isLoggedIn === true);
    }

    const [isLoggedIn, setIsLoggedIn] = useState(checkIfAnyUserLoggedIn() || false);

    return (
        <div className="font-inter">
            <Header isLoggedIn={isLoggedIn} />
            <AppRoutes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>
    );
}

export default App;
