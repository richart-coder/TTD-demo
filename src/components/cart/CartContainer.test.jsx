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
import {
  getCart,
  deleteFromCart,
  updateQuantityFromCart,
} from "../../services/CartService";

jest.mock("../../services/CartService");

describe("CartContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    getCart.mockResolvedValue([]);
    deleteFromCart.mockImplementation((id, items) => {
      return items.filter((item) => item.id !== id);
    });
    updateQuantityFromCart.mockImplementation((id, quantity, items) => {
      return items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
    });
  });

  it("應該顯示商品列表", async () => {
    await act(async () => {
      render(<CartContainer />);
    });

    expect(screen.getByText("購物車")).toBeInTheDocument();
    expect(await screen.findByText("iPhone 15 Pro")).toBeInTheDocument();
    expect(await screen.findByText("MacBook Pro 14")).toBeInTheDocument();
    expect(await screen.findByText("AirPods Pro")).toBeInTheDocument();
  });

  it("應該能夠刪除商品", async () => {
    await act(async () => {
      render(<CartContainer />);
    });

    await screen.findByText("iPhone 15 Pro");

    const deleteButtons = screen.getAllByLabelText("刪除商品");
    fireEvent.click(deleteButtons[0]);

    expect(deleteFromCart).toHaveBeenCalled();
  });

  it("應該能夠增加商品數量", async () => {
    await act(async () => {
      render(<CartContainer />);
    });

    await screen.findByText("iPhone 15 Pro");

    const increaseButtons = screen.getAllByLabelText("增加數量");
    fireEvent.click(increaseButtons[0]);

    expect(updateQuantityFromCart).toHaveBeenCalled();
  });

  it("應該能夠減少商品數量", async () => {
    getCart.mockResolvedValue([
      {
        id: 1,
        name: "iPhone 15 Pro",
        price: 35900,
        quantity: 2,
        image: "https://example.com/image.jpg",
      },
    ]);

    await act(async () => {
      render(<CartContainer />);
    });

    await screen.findByText("iPhone 15 Pro");

    const decreaseButtons = screen.getAllByLabelText("減少數量");
    fireEvent.click(decreaseButtons[0]);

    expect(updateQuantityFromCart).toHaveBeenCalled();
  });
});
