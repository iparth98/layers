import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { addProductValidationSchema } from "../../utils/validationSchema";
import { updateProduct as updateProductAPI } from "../../services/api/productsApi"; // Update API

const UpdateProduct = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  
  const formik = useFormik({
    initialValues: {
      title: product?.title || "",
      description: product?.description || "",
      quantity: product?.quantity || "",
      price: product?.price || "",
      discountedPrice: product?.discountedPrice || "",
    },
    enableReinitialize: true, // Ensures reinitialization when product data is received
    validationSchema: addProductValidationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("quantity", values.quantity);
      formData.append("price", values.price);
      formData.append("discountedPrice", values.discountedPrice || 0);

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      try {
        const response = await updateProductAPI(formData, product._id);
        console.log(response);
        toast.success(response.data.message);
        navigate("/vendor/products");
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong. Please try again.");
      }
    },      
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    formik.setFieldValue("productImage", file);
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl flex gap-6"
      >
        <div className="w-full">
          {/* Title */}
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className={`w-full p-2 border rounded-md transition-all duration-200 mt-1 ${
              formik.touched.title && formik.errors.title
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.title && formik.errors.title && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
          )}

          {/* Description */}
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Description
          </label>
          <textarea
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className={`w-full p-2 border rounded-md transition-all duration-200 mt-1 ${
              formik.touched.description && formik.errors.description
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.description}
            </p>
          )}

          {/* Quantity */}
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.quantity}
            className={`w-full p-2 border rounded-md transition-all duration-200 mt-1 ${
              formik.touched.quantity && formik.errors.quantity
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.quantity && formik.errors.quantity && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.quantity}
            </p>
          )}

          {/* Price */}
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Price
          </label>
          <input
            type="number"
            name="price"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
            className={`w-full p-2 border rounded-md transition-all duration-200 mt-1 ${
              formik.touched.price && formik.errors.price
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.price && formik.errors.price && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.price}</p>
          )}

          {/* Discounted Price */}
          <label
            htmlFor="discountedPrice"
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Discounted Price
          </label>
          <input
            type="number"
            name="discountedPrice"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.discountedPrice}
            className={`w-full p-2 border rounded-md transition-all duration-200 mt-1 ${
              formik.touched.discountedPrice && formik.errors.discountedPrice
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.discountedPrice && formik.errors.discountedPrice && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.discountedPrice}
            </p>
          )}

          {/* Product Image */}
          <label
            htmlFor="productImage"
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Product Image
          </label>
          <input
            type="file"
            name="productImage"
            onChange={handleImageChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border rounded-md transition-all duration-200 mt-1 border-gray-300"
          />
          <img src={product?.image} alt="Product image not found" className="w-80 h-96" />

          <button
            type="submit"
            className="bg-black text-white py-2 mt-6 rounded-md hover:bg-gray-800 transition-all w-full"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
