import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Sale", href: "#" },
  { label: "New", href: "#" },
  { label: "Women", href: "#" },
  { label: "Men", href: "#" },
  { label: "Kids", href: "#" },
];

const Navigation = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("token") || false;
  const expiresAt = localStorage.getItem("expiration") || false;

  const isAuthenticated =
    accessToken && expiresAt && new Date(expiresAt).getTime() > Date.now();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    navigate("/sign-in");
  };
  return (
    <nav className="top-0 py-3 border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex items-center justify-between">
          {/* Left side - Logo */}
          <div className="flex flex-shrink-0">
            <a className="text-xl tracking-tight" href="/">
              Layers
            </a>
            <ul className="hidden lg:flex ml-14 mt-1 space-x-10">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right side - Buttons */}
          <div className="hidden lg:flex space-x-12 items-center">
            {isAuthenticated ? (
              <>
                <button onClick={handleLogout} className="py-2 px-3">
                  Logout
                </button>
                <NavLink to="/cart">cart</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/sign-in" className="py-2 px-3">
                  Sign In
                </NavLink>

                <NavLink
                  to="/sign-up"
                  className="text-white bg-gradient-to-r from-black to-gray-500 py-2 px-3 rounded-md"
                >
                  Create an account
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
