// @ts-nocheck
import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import {
  deleteFromCart,
  getCart,
  updateQuantityFromCart,
} from "../../services/CartService";

const initialItems = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 35900,
    quantity: 1,
    image:
      "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702708",
  },
  {
    id: 2,
    name: "MacBook Pro 14",
    price: 49900,
    quantity: 1,
    image:
      "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp14-spacegray-select-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1671304673202",
  },
  {
    id: 3,
    name: "AirPods Pro",
    price: 7990,
    quantity: 1,
    image:
      "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1660803972361",
  },
];

const CartContainer = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadCart = async () => {
      const cart = await getCart();
      setItems(cart.length === 0 ? initialItems : cart);
      setIsLoading(false);
    };
    loadCart();
  }, []);

  const handleDelete = async (id) => {
    const updatedItems = deleteFromCart(id, items);
    setItems(updatedItems);
  };

  const handleUpdateQuantity = async (id, quantity) => {
    const updatedItems = updateQuantityFromCart(id, quantity, items);
    setItems(updatedItems);
  };

  return (
    <Cart
      items={items}
      isLoading={isLoading}
      onDelete={handleDelete}
      onUpdateQuantity={handleUpdateQuantity}
      total={items.reduce((acc, item) => acc + item.price * item.quantity, 0)}
    />
  );
};

export default CartContainer;
