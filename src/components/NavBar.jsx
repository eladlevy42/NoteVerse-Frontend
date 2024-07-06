import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "../lib/classNames"; // Utility function to conditionally apply classes
import { useAuth } from "@/contexts/AuthContext";

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { token, logout } = useAuth();
  const location = useLocation();
  const [loginBtn, setLoginBtn] = useState(null);
  useEffect(() => {
    setIsMobileMenuOpen(false);
    if (!token) {
      setLoginBtn(
        <div className="hidden sm:flex items-center space-x-4">
          <Link to="/auth/login">
            <Button variant="outline">Log In</Button>
          </Link>
          <Link to="/auth/register">
            <Button>Register</Button>
          </Link>
        </div>
      );
    } else {
      setLoginBtn(
        <>
          <Link
            to="/myTasks"
            className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
          >
            My Tasks
          </Link>
          <Button variant="outline" onClick={logout}>
            Log Out
          </Button>
        </>
      );
    }
  }, [location.pathname]);
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 my-auto">
              <Link to="/" className="text-2xl font-bold text-gray-800">
                NoteVerse
              </Link>
            </div>
            <div className="hidden sm:flex sm:ml-10 sm:space-x-8 my-auto">
              <Link
                to="/"
                className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </Link>
              {loginBtn}

              <Link
                to="/contact"
                className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn("sm:hidden", { hidden: !isMobileMenuOpen })}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          {loginBtn}
          <Link
            to="/about"
            className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </Link>
          <Link
            to="/services"
            className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
