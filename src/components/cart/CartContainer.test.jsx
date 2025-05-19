// @ts-nocheck
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CartContainer from "./CartContainer";
import { getCartTotal, deleteFromCart } from "@/services/CartService";

jest.mock("@/services/CartService", () => ({
  getCartTotal: jest.fn(),
  deleteFromCart: jest.fn(),
}));

describe("CartContainer", () => {
  const createMockItem = ({
    id = 1,
    name = "商品1",
    price = 100,
    quantity = 2,
  } = {}) => ({
    id,
    name,
    price,
    quantity,
  });

  const createLocalStorageMock = (items) => ({
    getItem: jest.fn(() => JSON.stringify(items)),
    setItem: jest.fn(),
  });

  beforeEach(() => {
    jest.clearAllMocks();
    getCartTotal.mockReturnValue(100);
  });

  it("能夠刪除購物車中的商品", () => {
    const mockItems = [createMockItem()];
    const localStorageMock = createLocalStorageMock(mockItems);

    render(<CartContainer localStorage={localStorageMock} />);
    fireEvent.click(screen.getByRole("button", { name: "刪除商品" }));

    expect(deleteFromCart).toHaveBeenCalledWith(1, localStorageMock);
  });

  it("能夠改變商品數量並保存到 localStorage", () => {
    const mockItems = [createMockItem(undefined, undefined, undefined, 2)];
    const localStorageMock = createLocalStorageMock(mockItems);
    getCartTotal.mockReturnValue(300);

    render(<CartContainer localStorage={localStorageMock} />);

    const plusButton = screen.getByRole("button", { name: "增加數量" });
    fireEvent.click(plusButton);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([{ ...mockItems[0], quantity: 3 }])
    );

    const minusButton = screen.getByRole("button", { name: "減少數量" });
    fireEvent.click(minusButton);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([{ ...mockItems[0], quantity: 2 }])
    );

    expect(getCartTotal).toHaveBeenCalledWith(localStorageMock);
  });

  it("不允許商品數量低於1", () => {
    const mockItems = [createMockItem({ quantity: 1 })];
    const localStorageMock = createLocalStorageMock(mockItems);

    render(<CartContainer localStorage={localStorageMock} />);

    const minusButton = screen.getByRole("button", { name: "減少數量" });
    fireEvent.click(minusButton);

    expect(localStorageMock.setItem).not.toHaveBeenCalled();
  });
});
