import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaTicketAlt } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-gray-900 border-b border-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-white text-xl font-semibold tracking-wide hover:scale-105 transition"
          >
            <FaTicketAlt className="text-blue-400" />
            Eventora
          </Link>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition duration-200"
            >
              Events
            </Link>

            {user ? (
              <>
                <Link
                  to={user.role === "admin" ? "/admin" : "/dashboard"}
                  className="text-gray-300 hover:text-white transition"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 px-4 py-2 rounded-lg text-white shadow-md transition transform hover:scale-105"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 px-4 py-2 rounded-lg text-white shadow-md transition transform hover:scale-105"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;