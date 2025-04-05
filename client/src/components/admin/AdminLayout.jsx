import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, Settings, Users, LogOut } from "lucide-react";

const AdminLayout = ({ children, userName }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Hello");

    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    navigate("/sign-in");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-gray-900 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1
            className={`${
              isSidebarOpen ? "block" : "hidden"
            } text-lg font-bold`}
          >
            Layers
          </h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white"
          >
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-1 px-4 py-4">
          <SidebarLink
            to="/admin"
            icon={<User />}
            label="Dashboard"
            isOpen={isSidebarOpen}
          />
          <SidebarLink
            to="/admin/vendors"
            icon={<Users />}
            label="Vendors"
            isOpen={isSidebarOpen}
          />
          <SidebarLink
            to="/admin/settings"
            icon={<Settings />}
            label="Settings"
            isOpen={isSidebarOpen}
          />
        </nav>

        {/* Logout */}
        {/* Logout */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 text-gray-300 hover:text-white py-2 w-full text-left"
          >
            <LogOut className="text-lg" />
            <span className={`${isSidebarOpen ? "block" : "hidden"} text-sm`}>
              Logout
            </span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {userName}</span>
          </div>
        </nav>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

// Sidebar Link Component
const SidebarLink = ({ to, icon, label, isOpen, onClick }) => (
  <Link
    to={to}
    className="flex items-center space-x-3 text-gray-300 hover:text-white py-2"
    onClick={onClick}
  >
    <span className="text-lg">{icon}</span>
    <span className={`${isOpen ? "block" : "hidden"} text-sm`}>{label}</span>
  </Link>
);

export default AdminLayout;
