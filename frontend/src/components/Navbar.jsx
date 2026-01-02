import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { Button } from "@/components/ui/button";

function Navbar() {

    const {authUser, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
      await logout();
      navigate("/login");
    };

    
  return (
    <nav className="border-b bg-white px-6 py-4 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Satori Hub
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-blue-600">
            Home
          </Link>

          {authUser ? (
            <>
              <Link
                to="/dashboard"
                className="text-sm font-medium hover:text-blue-600"
              >
                Dashboard
              </Link>
              <Link
                to="/explore"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                Explore
              </Link>
              <div className="flex items-center gap-4 border-l pl-6">
                <span className="text-sm text-gray-500">
                  Hi, {authUser.firstName}
                </span>
                <Button variant="destructive" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </>
          ) : (
            /* 2. If Logged Out: Show Login & Register */
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/register")}>Get Started</Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar