import { fetchWrapper } from "./utility";

const url = import.meta.env.VITE_SERVER_URL;

export const getProducts = async (page) => {
  try {
    const response = await fetch(`${url}api/products?page=${page}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.error || `Error: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Failed to fetch products");
  }
};

export const getProduct = async (productId) => {
  const response = await fetch(`${url}api/products/ ` + `${productId}`);
  const data = await response.json();
  return data;
};

export const getVendorProducts = async (vendorId) => {
  const response = await fetch(
    `${url}api/users/vendor/` + `${vendorId}` + `/products/`
  );
  const data = await response.json();
  return data;
};

export const addProduct = async (values) => {
  const response = fetchWrapper(`${url}api/products`, {
    method: "POST",
    body: values,
  });
  return await response;
};

export const updateProduct = async (values, productId) => {
  const response = fetchWrapper(`${url}api/products/${productId}`, {
    method: "PUT",
    body: values,
  });
  return await response;
};
