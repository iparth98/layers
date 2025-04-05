import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";

import { signUpValidationSchema } from "../../utils/validationSchema";
import { signUpInitialValues } from "../../utils/initialValues";
import { SignUp as SignUpApi } from "../../services/api/authenticationApi";

const SignUp = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: signUpInitialValues,
    validationSchema: signUpValidationSchema,
    onSubmit: async (values) => {
      const authenticate = await SignUpApi(values);
      console.log(authenticate);
      console.log(authenticate.message);
      if (authenticate && authenticate.status === "success") {
        toast.success("" + authenticate.message);
        navigate("/");
      } else {
        navigate("/sign-up");
        toast.error(authenticate.message);
      }
    },
  });

  return (
    <div className="flex items-center justify-center mt-10">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        {/* First Name Field */}
        <label htmlFor="fname" className="block text-gray-700 font-medium mb-1">
          First Name
        </label>
        <input
          id="fname"
          name="fname"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fname}
          className={`w-full p-2 border rounded-md transition-all duration-200 
            ${
              formik.touched.fname && formik.errors.fname
                ? "border-red-500"
                : "border-black"
            }`}
        />
        {formik.touched.fname && formik.errors.fname ? (
          <p className="text-red-500 text-sm mt-1">{formik.errors.fname}</p>
        ) : null}

        {/* Last Name Field */}
        <label htmlFor="lname" className="block text-gray-700 font-medium mb-1">
        Last Name
        </label>
        <input
          id="lname"
          name="lname"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lname}
          className={`w-full p-2 border rounded-md transition-all duration-200 
            ${
              formik.touched.lname && formik.errors.lname
                ? "border-red-500"
                : "border-black"
            }`}
        />
        {formik.touched.lname && formik.errors.lname ? (
          <p className="text-red-500 text-sm mt-1">{formik.errors.fname}</p>
        ) : null}

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

        {/* Confirm Password Field */}
        <label
          htmlFor="confirmPassword"
          className="block text-gray-700 font-medium mt-4 mb-1"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          className={`w-full p-2 border rounded-md transition-all duration-200 
            ${
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? "border-red-500"
                : "border-black"
            }`}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <p className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</p>
        ) : null}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 mt-6 rounded-md hover:bg-gray-800 transition-all"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
