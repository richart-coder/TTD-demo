// @ts-nocheck
import React from "react";
import CartItem from "./CartItem";
import Spinner from "../ui/Spinner";
import Counter from "../ui/Counter";

const Cart = ({ items, isLoading, onDelete, onUpdateQuantity }) => {
  return isLoading ? (
    <Spinner />
  ) : items.length == 0 ? (
    <p>購物車是空的</p>
  ) : (
    <ul className="flex flex-col items-center w-full max-w-2xl mx-auto">
      {items.map((item) => (
        <CartItem key={item.id} item={item}>
          <Counter
            count={item.quantity}
            onIncrement={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
            onDecrement={() => onUpdateQuantity?.(item.id, item.quantity - 1)}
          />
          <button
            className="clickable bg-red-500 text-white px-4 py-1 rounded-md"
            onClick={() => onDelete?.(item.id)}
          >
            刪除
          </button>
        </CartItem>
      ))}
    </ul>
  );
};

export default Cart;
