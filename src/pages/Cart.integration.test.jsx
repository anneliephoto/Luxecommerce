import React from "react";
import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./Home";
import Cart from "./Cart";
import { fetchProducts } from "../services/firestore";
import { createTestStore, renderWithProviders } from "../test/renderWithProviders";

jest.mock("../services/firestore", () => ({
  fetchProducts: jest.fn(),
  createOrder: jest.fn(),
}));

jest.mock("../firebase", () => ({
  db: null,
}));

jest.mock("../context/AuthContext", () => ({
  useAuth: () => ({ user: null, profile: null }),
}));

describe("Cart integration", () => {
  it("shows a cart item after adding a product from Home", async () => {
    fetchProducts.mockResolvedValue([
      {
        id: "p1",
        title: "Runner Shoes",
        category: "Footwear",
        price: 79.5,
        description: "Lightweight shoes for daily wear.",
        image: "https://example.com/shoes.png",
      },
    ]);

    const store = createTestStore();
    const user = userEvent.setup();

    renderWithProviders(<Home />, { store });

    await user.click(await screen.findByRole("button", { name: "Add to Cart" }));

    expect(store.getState().cart.items).toHaveLength(1);

    renderWithProviders(<Cart />, { store, route: "/cart" });

    expect(within(screen.getByRole("table")).getByText("Runner Shoes")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Total Items: 1")).toBeInTheDocument();
      expect(screen.getByText("Total Price: $79.50")).toBeInTheDocument();
    });
  });
});