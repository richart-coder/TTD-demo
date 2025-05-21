// @ts-nocheck
import {
  getCart,
  addToCart,
  deleteFromCart,
  updateQuantityFromCart,
} from "./CartService";
import db from "../db/ShopDB";

jest.mock("../db/ShopDB", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe("CartService", () => {
  const mockCart = [
    { id: 1, name: "商品1", price: 100, quantity: 1 },
    { id: 2, name: "商品2", price: 200, quantity: 1 },
  ];

  const setup = () => {
    db.getItem.mockResolvedValue(JSON.stringify(mockCart));
    return {
      getCart,
      addToCart,
      deleteFromCart,
      updateQuantityFromCart,
    };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("能夠回傳購物車內容", async () => {
    const { getCart } = setup();
    const result = await getCart();

    expect(result).toEqual(mockCart);
    expect(db.getItem).toHaveBeenCalledWith("cart");
  });

  it("能夠添加新商品", async () => {
    const { addToCart } = setup();
    const newItem = { id: 3, name: "商品3", price: 300 };
    const cartWithItems = addToCart(newItem, mockCart);

    expect(db.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(cartWithItems)
    );
    const item = cartWithItems[0];
    expect(item.id).toBe(3);
    expect(item.quantity).toBe(1);
  });

  it("能夠刪除商品", async () => {
    const { deleteFromCart } = setup();
    const result = await deleteFromCart(1, mockCart);

    expect(result.length).toBe(1);
    expect(result[0].id).toBe(2);
    expect(db.setItem).toHaveBeenCalledWith("cart", JSON.stringify(result));
  });

  it("能夠更新商品數量", async () => {
    const { updateQuantityFromCart } = setup();
    const result = updateQuantityFromCart(1, 3, mockCart);

    expect(db.setItem).toHaveBeenCalledWith("cart", JSON.stringify(result));
    expect(result[0].quantity).toBe(3);
  });
});
