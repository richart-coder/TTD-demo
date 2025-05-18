// @ts-nocheck
import { addToCart, deleteFromCart, getCartTotal } from "./CartService";

describe("CartService", () => {
  beforeEach(() => {
    const mockLocalStorage = {
      getItem: jest.fn().mockReturnValue("[]"),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      length: 0,
      key: jest.fn(),
    };
    global.localStorage = mockLocalStorage;
  });
  const TEST_ITEM = {
    id: 1,
    name: "商品1",
    price: 100,
    image: "https://example.com/image1.jpg",
    description: "這是商品1的描述",
    category: "電子產品",
    stock: 10,
    sku: "ELEC-001",
    brand: "品牌A",
  };

  const localStorageMocks = {
    getCart: () => JSON.parse(global.localStorage.getItem("cart") || "[]"),
    setCart: (cart) =>
      global.localStorage.setItem("cart", JSON.stringify(cart)),
  };

  function _assertGetItemHaveBeenCalled() {
    expect(global.localStorage.getItem).toHaveBeenCalledWith("cart");
  }

  function _assertSetItemHaveBeenCalled() {
    expect(global.localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      expect.any(String)
    );
  }

  function _getLastSavedCart() {
    const setItemCall = global.localStorage.setItem.mock.calls[0];
    return JSON.parse(setItemCall[1]);
  }

  it("能將商品加入購物車", () => {
    const initialCart = [
      {
        id: TEST_ITEM.id,
        name: TEST_ITEM.name,
        image: TEST_ITEM.image,
        description: TEST_ITEM.description,
        price: TEST_ITEM.price,
        quantity: 1,
        addedAt: new Date().toISOString(),
      },
    ];
    global.localStorage.getItem.mockReturnValue(JSON.stringify(initialCart));

    addToCart(TEST_ITEM, localStorageMocks);

    _assertGetItemHaveBeenCalled();
    _assertSetItemHaveBeenCalled();

    const savedCart = _getLastSavedCart();
    expect(savedCart.length).toBe(1);
    expect(savedCart[0].quantity).toBe(2);
  });

  it("能從購物車中移除商品", () => {
    const itemId = 2;
    const cartWithItem = [{ id: itemId }];
    global.localStorage.getItem.mockReturnValue(JSON.stringify(cartWithItem));

    deleteFromCart(itemId, localStorageMocks);

    _assertGetItemHaveBeenCalled();
    _assertSetItemHaveBeenCalled();

    const savedCart = _getLastSavedCart();
    expect(savedCart.length).toBe(0);
  });

  it("驗證移除不存在的商品", () => {
    const existingItemId = 2;
    const nonExistingItemId = 999;
    const initialCart = [{ id: existingItemId }];
    global.localStorage.getItem.mockReturnValue(JSON.stringify(initialCart));

    deleteFromCart(nonExistingItemId, localStorageMocks);

    _assertGetItemHaveBeenCalled();
    expect(global.localStorage.setItem).not.toHaveBeenCalled();
  });

  it("能夠計算購物車總金額", () => {
    const cartWithItems = [
      { price: 200, quantity: 2 },
      { price: 300, quantity: 3 },
    ];
    const expectedTotal = 1300;

    global.localStorage.getItem.mockReturnValue(JSON.stringify(cartWithItems));

    const total = getCartTotal(localStorageMocks);

    expect(total).toBe(expectedTotal);
  });
});
