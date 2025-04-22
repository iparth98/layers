import { createContext, useState } from "react";
import { updateCart as updateCartAPi } from "../services/api/cartApi";
export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  const addToCartHandler = async (productId, quantity) => {
    try {
      const res = await updateCartAPi(productId, quantity);
      const { status, message, data } = res.data;
      setCartCount(data?.products?.length);

      return { status, message };
    } catch (err) {
      return {
        status: "error",
        message: "Something went wrong. Please try again.",
      };
    }
  };

  return (
    <CartContext.Provider value={{ cartCount, addToCartHandler }}>
      {children}
    </CartContext.Provider>
  );
}
