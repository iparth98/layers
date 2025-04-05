import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { useFormik } from "formik";
import { signInValidationSchema } from "../../utils/validationSchema";
import { signInInitialValues } from "../../utils/initialValues";
import { SignIn as signInApi } from "../../services/api/authenticationApi";

const SignIn = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: signInInitialValues,
    validationSchema: signInValidationSchema,
    onSubmit: async (values) => {
      try {
        const authenticate = await signInApi(values);
        const roleRoutes = {
          admin: "/admin",
          vendor: "/vendor",
        };

        if (authenticate?.status === "success") {
          const userRole = authenticate?.data?.role?.name;
          const route = roleRoutes[userRole] || "/";

          toast.success(authenticate.message);
          navigate(route);
        } else {
          toast.error(authenticate.message);
          navigate("/sign-in");
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  return (
    <div className="flex items-center justify-center mt-10">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        {/* Email Field */}
        <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className={`w-full p-2 border rounded-md transition-all duration-200 
            ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : "border-black"
            }`}
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
        ) : null}

        {/* Password Field */}
        <label
          htmlFor="password"
          className="block text-gray-700 font-medium mt-4 mb-1"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className={`w-full p-2 border rounded-md transition-all duration-200 
            ${
              formik.touched.password && formik.errors.password
                ? "border-red-500"
                : "border-black"
            }`}
        />
        {formik.touched.password && formik.errors.password ? (
          <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
        ) : null}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 mt-6 rounded-md hover:bg-gray-800 transition-all"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
