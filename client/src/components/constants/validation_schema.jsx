import * as Yup from "yup";

export const validationSchema = Yup.object({
//   firstName: Yup.string()
//     .required("First name is required")
//     .min(2, "First name must be at least 2 characters")
//     .max(30, "First name must not exceed 30 characters"),
//   lastName: Yup.string()
//     .required("Last name is required")
//     .min(2, "Last name must be at least 2 characters")
//     .max(30, "Last name must not exceed 30 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(16, "Password must not exceed 16 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});
