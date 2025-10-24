import React from "react";
import { User, LogOut, FileText, Settings, LogIn, Search } from "lucide-react";
import { Link } from "react-router-dom";

const NavigationMenu = ({ closeMenu }) => {
    return (
        <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-40 animate-slide-left">
            <nav className="flex flex-col space-y-6 p-6">
                <Link to="/dashboard" onClick={closeMenu} className="flex items-center text-[#4A3F35] font-medium">
                    <User className="mr-3" /> Dashboard
                </Link>
                <Link to="/joboffers" onClick={closeMenu} className="flex items-center text-gray-700 hover:text-[#4A3F35]">
                    <FileText className="mr-3" /> New Job Offer
                </Link>
                <Link to="/login" onClick={closeMenu} className="flex items-center text-gray-700 hover:text-[#4A3F35]">
                    <LogIn className="mr-3" /> Login / Signup
                </Link>
                <Link to="/joboffers" onClick={closeMenu} className="flex items-center text-gray-700 hover:text-[#4A3F35]">
                    <Search className="mr-3" /> Job Search
                </Link>
                <Link to="/settings" onClick={closeMenu} className="flex items-center text-gray-700 hover:text-[#4A3F35]">
                    <Settings className="mr-3" /> Settings
                </Link>
                <Link to="/logout" onClick={closeMenu} className="flex items-center text-gray-700 hover:text-[#4A3F35]">
                    <LogOut className="mr-3" /> Log Out
                </Link>
            </nav>
        </div>
    );
};

export default NavigationMenu;
