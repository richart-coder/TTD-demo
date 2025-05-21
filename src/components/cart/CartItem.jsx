import React, { memo } from "react";

const CartItem = ({ item, children, ...props }) => {
  return (
    <li
      className={`w-full bg-white rounded-lg shadow mb-6 border border-gray-200 p-6 flex flex-col sm:flex-row items-center gap-4`}
      {...props}
    >
      <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain rounded"
        />
      </div>
      <div className="flex-grow flex flex-col gap-2 w-full">
        <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
        <p className="text-lg font-bold text-blue-700">
          NT$ {item.price.toLocaleString()}
        </p>
      </div>
      <div className="w-full flex justify-end items-center gap-5">
        {children}
      </div>
    </li>
  );
};

export default memo(CartItem);
