import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { currentUser } from "../../services/api/authenticationApi";

const AdminPrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false); // Handle redirection properly

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const data = await currentUser();

        const role = data?.data?.data?.role?.name;

        if (data.success && role === "admin") {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("expiration");
          setIsAuthenticated(false);
          setShouldRedirect(true); // Set redirection only after state updates
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setIsAuthenticated(false);
        setShouldRedirect(true);
      } finally {
        setLoading(false); // Ensure loading stops once API call completes
      }
    };

    getCurrentUser();
  }, []);


  // Prevent rendering issues during loading
  if (loading) return <div className="text-center mt-5">Loading...</div>;

  // **Prevent direct `Navigate` calls in render cycle**
  if (shouldRedirect) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
};

export default AdminPrivateRoute;
