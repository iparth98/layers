import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { currentUser } from "../../services/api/authenticationApi";

const PrivateRoute = ({ role }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    const getCurrentUser = async () => {
      try {
        const { success, data } = await currentUser();
        if (success) {
          setUser({
            name: `${data.user?.fname} ${data.user?.lname}`,
            role: data.user.role?.name,
          });
          localStorage.setItem("user", JSON.stringify({
            _id: data.user?._id,
            email: data.user?.email,
            role: data.user?.role?.name
          }));
          
        } else {
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  if (!user || (role && user.role !== role)) return <Navigate to="/" replace />;

  return <Outlet context={{ user }} />;
};

export default PrivateRoute;
