import * as Yup from "yup";

export const signInValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().min(6).max(12).required("Password is required"),
});

export const signUpValidationSchema = Yup.object({
  fname: Yup.string().required("First name is required"),
  lname: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password cannot exceed 12 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const addProductValidationSchema = Yup.object({
  title: Yup.string().required(
    "Title is required and should be at least 4 words."
  ),
  description: Yup.string().required("Description is required."),
  quantity: Yup.number()
    .required("Quantity is required")
    .positive()
    .min(1, "Quantity must be at least 1."),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive.")
    .min(1, "Price must be at least 1."),
  discountedPrice: Yup.number()
    .optional()
    .positive("Discounted price must be positive.")
    .min(0, "Discounted price must be at least 1."),
  productImage: Yup.mixed().required("Product image is required"),
});
