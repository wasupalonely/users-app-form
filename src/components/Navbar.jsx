import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-blue-600 shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              Sistema de Usuarios
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/users"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/users")
                  ? "bg-blue-700 text-white"
                  : "text-blue-100 hover:bg-blue-500"
              }`}
            >
              Usuarios
            </Link>
            <Link
              to="/register"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/register")
                  ? "bg-blue-700 text-white"
                  : "text-blue-100 hover:bg-blue-500"
              }`}
            >
              Registrar Usuario
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
