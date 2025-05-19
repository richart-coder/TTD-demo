// @ts-nocheck
import React from "react";
import CartItem from "./CartItem";

const Cart = ({ items, onDelete, onUpdateQuantity, total }) => {
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
          NT$ {total.toLocaleString()}
        </span>
      </div>
      {items.length === 0 ? (
        <p className="text-gray-500">購物車是空的</p>
      ) : (
        <ul className="flex flex-col items-center w-full max-w-2xl mx-auto">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onDelete={onDelete}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default Cart;
