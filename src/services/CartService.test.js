// @ts-nocheck
import {
  addToCart,
  deleteFromCart,
  updateQuantityFromCart,
  getCart,
} from "./CartService";
import db from "../db/ShopDB";

jest.mock("../db/ShopDB", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe("CartService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("能夠回傳購物車內容", async () => {
    const mockCart = [{ id: 1, name: "商品1", price: 100, quantity: 1 }];
    db.getItem.mockResolvedValue(JSON.stringify(mockCart));

    const result = await getCart();

    expect(result).toEqual(mockCart);
    expect(db.getItem).toHaveBeenCalledWith("cart");
  });

  it("能夠添加新商品", async () => {
    const cart = [];
    const newItem = { id: 1, name: "商品1", price: 100 };

    const result = addToCart(newItem, cart);

    expect(result[0].id).toBe(1);
    expect(result[0].quantity).toBe(1);
  });

  it("能夠刪除商品", async () => {
    const cart = [
      { id: 1, name: "商品1", price: 100, quantity: 1 },
      { id: 2, name: "商品2", price: 200, quantity: 1 },
    ];

    const result = deleteFromCart(1, cart);

    expect(result.length).toBe(1);
    expect(result[0].id).toBe(2);
  });

  it("能夠更新商品數量", async () => {
    const cart = [{ id: 1, name: "商品1", price: 100, quantity: 1 }];

    const result = updateQuantityFromCart(1, 3, cart);

    expect(result[0].quantity).toBe(3);
  });
});
