// @ts-nocheck
import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import {
  deleteFromCart,
  getCart,
  updateQuantityFromCart,
} from "../../services/CartService";

const CartContainer = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadCart = async () => {
      const cart = await getCart();
      setItems(cart);
      setIsLoading(false);
    };
    loadCart();
  }, []);

  const handleDelete = (id) => {
    const updatedItems = deleteFromCart(id, items);
    setItems(updatedItems);
  };

  const handleUpdateQuantity = (id, quantity) => {
    const updatedItems = updateQuantityFromCart(id, quantity, items);
    setItems(updatedItems);
  };

  return (
    <section
      role="region"
      aria-label="購物車"
      className="w-full min-h-screen bg-gray-50 flex flex-col items-center py-8"
    >
      <div className="flex items-center w-full max-w-2xl mb-8 gap-12">
        <h2 className="text-2xl font-bold text-gray-800 tracking-wide">
          購物車
        </h2>
        <span className="text-xl font-bold text-blue-700 bg-white rounded-lg py-3 px-3 shadow border border-gray-200 flex-1">
          NT${" "}
          {items.reduce(
            (acc, { price, quantity }) => acc + price * quantity,
            0
          )}
        </span>
      </div>
      <Cart
        items={items}
        isLoading={isLoading}
        onDelete={handleDelete}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </section>
  );
};

export default CartContainer;
