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

const mockCartItems = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 35900,
    quantity: 1,
    image: "test-image-url",
  },
  {
    id: 2,
    name: "MacBook Pro",
    price: 49900,
    quantity: 1,
    image: "test-image-url",
  },
];

jest.mock("../../services/CartService");

describe("<CartContainer />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getCart.mockResolvedValue(mockCartItems);
  });

  const setup = async () => {
    let utils;
    await act(async () => {
      utils = render(<CartContainer />);
    });

    await waitFor(() => {
      expect(screen.getByText("iPhone 15 Pro")).toBeInTheDocument();
      expect(screen.getByText("MacBook Pro")).toBeInTheDocument();
    });

    return {
      ...utils,
      getDeleteButtons: () => screen.getAllByText("刪除"),
      getIncreaseButtons: () => screen.getAllByLabelText("增加數量"),
    };
  };

  it("能夠刪除商品", async () => {
    const { getDeleteButtons } = await setup();
    deleteFromCart.mockReturnValue([mockCartItems[1]]);
    const deleteButtons = getDeleteButtons();

    await act(async () => {
      fireEvent.click(deleteButtons[0]);
    });

    expect(deleteFromCart).toHaveBeenCalledWith(1, mockCartItems);

    await waitFor(() => {
      expect(screen.queryByText("iPhone 15 Pro")).not.toBeInTheDocument();
    });
  });

  it("能夠調高商品數量", async () => {
    const { getIncreaseButtons } = await setup();
    updateQuantityFromCart.mockReturnValue([
      { ...mockCartItems[0], quantity: 2 },
      mockCartItems[1],
    ]);
    const increaseButtons = getIncreaseButtons();

    await act(async () => {
      fireEvent.click(increaseButtons[0]);
    });

    expect(updateQuantityFromCart).toHaveBeenCalledWith(1, 2, mockCartItems);
    await waitFor(() => {
      expect(screen.getAllByLabelText("count")[0].textContent).toBe("2");
    });
  });
});
