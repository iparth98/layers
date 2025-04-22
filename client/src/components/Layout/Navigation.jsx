import { useContext } from "react";
import { ShoppingCart } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import { CartContext } from "../../context/CartContext";

const navItems = [
  { label: "Sale", href: "#" },
  { label: "New", href: "#" },
  { label: "Women", href: "#" },
  { label: "Men", href: "#" },
  { label: "Kids", href: "#" },
];

const Navigation = () => {
  const { cartCount } = useContext(CartContext);

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
            <NavLink className="text-xl tracking-tight" to="/">
              Layers
            </NavLink>
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
                <div className="relative flex items-center space-x-4">
                  <NavLink to="/cart" className="relative">
                    <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-black transition" />
                    <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 text-xs font-semibold bg-black text-white rounded-full shadow-md">
                      {cartCount}
                    </span>
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-800 hover:bg-gray-700 text-white text-sm px-4 py-2 rounded-md transition"
                  >
                    Logout
                  </button>
                </div>
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
