import { fetchWrapper } from "./utility.js";

const url = import.meta.env.VITE_SERVER_URL;

export const updateCart = async (productId, quantity) => {
  const product = { productId, quantity };

  try {
    const response = await fetchWrapper(`${url}api/add-to-cart`, {
      method: "POST",
      body: JSON.stringify(product),
    });
    console.log(response, response.status, response.ok, response.success);

    // Handle API response properly
    if (response.status === 422) {
      return { success: false, message: response.message };
    }
    if (!response || !response.success) {
      throw new Error(response?.message || "Failed to update cart");
    }

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error updating cart:", error);
    return { success: false, message: error.message };
  }
};

// ✅ Fixed `getCart`
export const getCart = async () => {
  try {
    const response = await fetchWrapper(`${url}api/cart`, {
      method: "GET",
    });

    // Ensure we properly check for 401 or 422 response
    if (!response || response.status === 422) {
      return { success: false, message: response.message };
    }
    console.log(response?.data?.data);
    
    return { success: true, data: response?.data?.data };
  } catch (error) {
    console.error("Error fetching cart:", error);
    return { success: false, message: error.message };
  }
};
