const Counter = ({
  count,
  onIncrement,
  onDecrement,
  min = 1,
  max = Infinity,
}) => {
  return (
    <div className="flex items-center">
      <button
        className="clickable w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 text-lg font-bold"
        onClick={onDecrement}
        aria-label="減少數量"
        disabled={count <= min}
      >
        -
      </button>
      <span aria-label="count" className="w-8 text-center select-none">
        {count}
      </span>
      <button
        className="clickable w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 text-lg font-bold"
        onClick={onIncrement}
        aria-label="增加數量"
        disabled={count >= max}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
