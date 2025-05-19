import React, { memo } from "react";

const CartItem = ({ item, onDelete, onUpdateQuantity, className = "" }) => {
  return (
    <li
      className={`w-full bg-white rounded-lg shadow mb-6 border border-gray-200 p-6 flex flex-col sm:flex-row items-center gap-4 ${className}`}
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
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-2">
            <label>數量：</label>
            <button
              className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 text-lg font-bold"
              onClick={() => onUpdateQuantity?.(item.id, item.quantity - 1)}
              aria-label="減少數量"
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span className="w-8 text-center select-none">{item.quantity}</span>
            <button
              className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 text-lg font-bold"
              onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
              aria-label="增加數量"
            >
              +
            </button>
          </div>
          <button
            onClick={() => onDelete?.(item.id)}
            aria-label="刪除商品"
            className="ml-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-base font-medium"
          >
            刪除
          </button>
        </div>
      </div>
    </li>
  );
};

export default memo(CartItem);
