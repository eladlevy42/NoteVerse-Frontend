import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react"; // Import Lucide icons
import { Button } from "@/components/ui/button";
import { cn } from "../lib/classNames"; // Utility function to conditionally apply classes
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";

function NavBar() {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { token, logout } = useAuth();
  const location = useLocation();
  const [loginBtn, setLoginBtn] = useState(null);
  const [rotated, setRotated] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    if (!token) {
      setLoginBtn(
        <>
          <Link
            className="text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))] block px-3 py-2 rounded-md text-base font-medium"
            to="/auth/login"
          >
            Log In
          </Link>
          <Link
            className="text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))] block px-3 py-2 rounded-md text-base font-medium"
            to="/auth/register"
          >
            Register
          </Link>
        </>
      );
    } else {
      setLoginBtn(
        <>
          <Link
            to="/myTasks"
            className="text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))] block px-3 py-2 rounded-md text-base font-medium"
          >
            My Notes
          </Link>
          <Button onClick={logout}>Log Out</Button>
        </>
      );
    }
  }, [location.pathname, token]);

  const handleToggleTheme = () => {
    setRotated(true);
    setTimeout(() => {
      toggleTheme();
      setTimeout(() => {
        setRotated(false);
      }, 300); // Duration for the second half of the rotation
    }, 300); // Duration for the first half of the rotation
  };

  return (
    <nav className="bg-[hsl(var(--card))] shadow-md border-b border-[hsl(var(--border))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 my-auto">
              <Link
                to="/"
                className="text-2xl font-bold text-[hsl(var(--foreground))]"
              >
                NoteVerse
              </Link>
            </div>
            <div className="hidden sm:flex sm:ml-10 sm:space-x-8 my-auto">
              <Link
                to="/"
                className="text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))] block px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </Link>
              {loginBtn}
              <Link
                to="/contact"
                className="text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))] block px-3 py-2 rounded-md text-base font-medium"
              >
                Contact
              </Link>
              <button
                onClick={handleToggleTheme}
                className="bg-transparent border-none focus:outline-none transition duration-300 ease-in-out transform hover:scale-110"
              >
                <div className={`icon ${rotated ? "animate-rotateInOut" : ""}`}>
                  {theme === "light" ? (
                    <Moon className="text-[hsl(var(--foreground))] w-6 h-6" />
                  ) : (
                    <Sun className="text-[hsl(var(--foreground))] w-6 h-6" />
                  )}
                </div>
              </button>
            </div>
          </div>

          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] focus:outline-none focus:bg-[hsl(var(--muted))] focus:text-[hsl(var(--foreground))]"
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
        className={cn(
          "sm:hidden bg-[hsl(var(--card))] transition-transform transform",
          {
            block: isMobileMenuOpen,
            hidden: !isMobileMenuOpen,
          }
        )}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))] block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          {loginBtn}
          <Link
            to="/contact"
            className="text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))] block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact
          </Link>
          <button
            onClick={handleToggleTheme}
            className="bg-transparent border-none focus:outline-none transition duration-300 ease-in-out transform hover:scale-110"
          >
            <div className={`icon ${rotated ? "animate-rotateInOut" : ""}`}>
              {theme === "light" ? (
                <Moon className="text-[hsl(var(--foreground))] w-6 h-6" />
              ) : (
                <Sun className="text-[hsl(var(--foreground))] w-6 h-6" />
              )}
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
