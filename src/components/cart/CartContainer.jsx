// @ts-nocheck
import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import { getCartTotal, deleteFromCart } from "@/services/CartService";

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

const CartContainer = ({ localStorage }) => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const loadCart = async () => {
      const cart = JSON.parse((await localStorage.getItem("cart")) || "[]");
      if (cart.length === 0) {
        await localStorage.setItem("cart", JSON.stringify(initialItems));
        setItems(initialItems);
      } else {
        setItems(cart);
      }
      setTotal(await getCartTotal(localStorage));
    };

    loadCart();
  }, [localStorage]);

  const handleDelete = async (id) => {
    await deleteFromCart(id, localStorage);
    setItems((prev) => prev.filter((item) => item.id !== id));
    setTotal(getCartTotal(localStorage));
  };

  const handleUpdateQuantity = async (id, quantity) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    await localStorage.setItem("cart", JSON.stringify(updatedItems));
    setItems(updatedItems);
    setTotal(await getCartTotal(localStorage));
  };

  return (
    <Cart
      items={items}
      onDelete={handleDelete}
      onUpdateQuantity={handleUpdateQuantity}
      total={total}
    />
  );
};

export default CartContainer;
