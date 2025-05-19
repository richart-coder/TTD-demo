// @ts-nocheck
import { addToCart, deleteFromCart, getCartTotal } from "./CartService";

describe("CartService", () => {
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

  function createStorageMock(initialCart = []) {
    return {
      getItem: jest.fn().mockResolvedValue(JSON.stringify(initialCart)), // 改為 mockResolvedValue
      setItem: jest.fn().mockResolvedValue(undefined), // 改為 mockResolvedValue
    };
  }

  function assertGetItemCalled(mockStorage) {
    expect(mockStorage.getItem).toHaveBeenCalledWith("cart");
  }

  function assertSetItemCalled(mockStorage) {
    expect(mockStorage.setItem).toHaveBeenCalledWith(
      "cart",
      expect.any(String)
    );
  }

  function assertSetItemNotCalled(mockStorage) {
    expect(mockStorage.setItem).not.toHaveBeenCalled();
  }

  function getLastSavedCart(mockStorage) {
    const setItemCall = mockStorage.setItem.mock.calls[0];
    return JSON.parse(setItemCall[1]);
  }

  it("能將商品加入購物車", async () => {
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
    const mockStorage = createStorageMock(initialCart);

    await addToCart(TEST_ITEM, mockStorage); // 添加 await

    assertGetItemCalled(mockStorage);
    assertSetItemCalled(mockStorage);
    const savedCart = getLastSavedCart(mockStorage);
    expect(savedCart.length).toBe(1);
    expect(savedCart[0].quantity).toBe(2);
  });

  it("能從購物車中移除商品", async () => {
    const itemId = 2;
    const mockStorage = createStorageMock([{ id: itemId }]);

    await deleteFromCart(itemId, mockStorage); // 添加 await

    assertGetItemCalled(mockStorage);
    assertSetItemCalled(mockStorage);
    const savedCart = getLastSavedCart(mockStorage);
    expect(savedCart.length).toBe(0);
  });

  it("驗證移除不存在的商品", async () => {
    const existingItemId = 2;
    const nonExistingItemId = 999;
    const mockStorage = createStorageMock([{ id: existingItemId }]);

    await deleteFromCart(nonExistingItemId, mockStorage); // 添加 await

    assertGetItemCalled(mockStorage);
    assertSetItemNotCalled(mockStorage);
  });

  it("能夠計算購物車總金額", async () => {
    const cartWithItems = [
      { price: 200, quantity: 2 },
      { price: 300, quantity: 3 },
    ];
    const expectedTotal = 1300;
    const mockStorage = createStorageMock(cartWithItems);

    const total = await getCartTotal(mockStorage); // 添加 await

    expect(total).toBe(expectedTotal);
  });
});
