import { useState, useEffect } from "react";
import { getCart as getCartAPI, updateCart } from "../services/api/cartApi";

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState(null);

  const loadCart = async () => {
    try {
      const data = await getCartAPI();
      console.log(data.data);
      
      setCartItems(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const updateQuantity = async (id, newQuantity) => {
    try {
      await updateCart(id, newQuantity);
      loadCart();
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  if (!cartItems) {
    return <div className="text-center p-6">Your Shopping cart is empty</div>;
  }  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>

      {cartItems?.products?.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-left">Product</th>
                  <th className="py-2 px-4 text-center">Quantity</th>
                  <th className="py-2 px-4 text-center">Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.products.map((item) => (
                  <tr key={item._id} className="border-b">
                    <td className="py-2 px-4">
                      {item.productId?.title || "N/A"}
                    </td>
                    <td className="py-2 px-4 text-center flex items-center justify-center space-x-2">
                      <button
                        className="px-2 py-1 bg-gray-300 rounded"
                        onClick={() => updateQuantity(item.productId._id, -1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="px-2 py-1 bg-gray-300 rounded"
                        onClick={() => updateQuantity(item.productId._id, 1)}
                      >
                        +
                      </button>
                    </td>
                    <td className="py-2 px-4 text-center">${item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Price Section */}
          <div className="mt-6 flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              Total: ${cartItems.totalPrice.toFixed(2)}
            </h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Proceed to Checkout
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
}