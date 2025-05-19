// @ts-nocheck
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import CartContainer from "./CartContainer";
import { getCartTotal, deleteFromCart } from "@/services/CartService";

jest.mock("@/services/CartService", () => ({
  getCartTotal: jest.fn().mockResolvedValue(100),
  deleteFromCart: jest.fn().mockResolvedValue(undefined),
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
    getCartTotal.mockResolvedValue(100);
  });

  it("能夠刪除購物車中的商品", async () => {
    const mockItems = [createMockItem()];
    const localStorageMock = createLocalStorageMock(mockItems);

    await act(async () => {
      render(<CartContainer localStorage={localStorageMock} />);
    });

    await waitFor(() => {
      expect(screen.getByText("商品1")).toBeInTheDocument();
    });

    const deleteButton = screen.getByLabelText("刪除商品");
    await act(async () => {
      fireEvent.click(deleteButton);
    });

    expect(deleteFromCart).toHaveBeenCalledWith(1, localStorageMock);
  });

  it("能夠改變商品數量並保存到 localStorage", async () => {
    const mockItems = [createMockItem()];
    const localStorageMock = createLocalStorageMock(mockItems);
    getCartTotal.mockResolvedValue(300);

    await act(async () => {
      render(<CartContainer localStorage={localStorageMock} />);
    });

    await waitFor(() => {
      expect(screen.getByText("商品1")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
    });

    const plusButton = screen.getByLabelText("增加數量");

    await act(async () => {
      fireEvent.click(plusButton);
    });

    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "cart",
        expect.stringMatching(/"quantity":3/)
      );
    });

    localStorageMock.setItem.mockClear();

    const minusButton = screen.getByLabelText("減少數量");

    await act(async () => {
      fireEvent.click(minusButton);
    });

    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "cart",
        expect.stringMatching(/"quantity":2/)
      );
    });

    expect(getCartTotal).toHaveBeenCalledWith(localStorageMock);
  });

  it("不允許商品數量低於1", async () => {
    const mockItems = [createMockItem({ quantity: 1 })];
    const localStorageMock = createLocalStorageMock(mockItems);

    await act(async () => {
      render(<CartContainer localStorage={localStorageMock} />);
    });

    await waitFor(() => {
      expect(screen.getByText("商品1")).toBeInTheDocument();
      expect(screen.getByText("1")).toBeInTheDocument();
    });

    localStorageMock.setItem.mockClear();

    const minusButton = screen.getByLabelText("減少數量");
    expect(minusButton).toBeDisabled();

    expect(localStorageMock.setItem).not.toHaveBeenCalled();
  });
});
