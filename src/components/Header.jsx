import React, { useState } from "react";
import NavigationMenu from "./NavigationMenu";
import { Menu, X } from "lucide-react"; // Icons
import { useLocation, useNavigate } from "react-router-dom";

const Header = ({ isLoggedIn }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleMenu = () => setMenuOpen(!menuOpen);

    // If user is not logged in and on login/signup page
    const onAuthPage = location.pathname === "/login" || location.pathname === "/signup";

    return (
        <header className="w-full bg-white shadow-md px-4 py-3 flex justify-between items-center fixed top-0 left-0 z-50">
            {/* Logo */}
            <div className="text-xl font-bold text-gray-800 cursor-pointer" onClick={() => navigate("/")}>
                LOGO
            </div>

            {/* Right Section */}
            {!isLoggedIn ? (
                <div>
                    {onAuthPage ? (
                        <button
                            onClick={() => navigate("/login")}
                            className="px-4 py-2 bg-[#4A3F35] text-white rounded-lg hover:bg-[#3a3029] transition"
                        >
                            Login / Register
                        </button>
                    ) : null}
                </div>
            ) : (
                <>
                    <button onClick={toggleMenu} className="p-2 rounded-md hover:bg-gray-100">
                        {menuOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                    {menuOpen && <NavigationMenu closeMenu={() => setMenuOpen(false)} />}
                </>
            )}
        </header>
    );
};

export default Header;
