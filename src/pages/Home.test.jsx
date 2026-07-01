import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./Home";
import { fetchProducts } from "../services/firestore";
import { createTestStore, renderWithProviders } from "../test/renderWithProviders";

jest.mock("../services/firestore", () => ({
  fetchProducts: jest.fn(),
}));

describe("Home", () => {
  it("renders products from Firestore", async () => {
    fetchProducts.mockResolvedValue([
      {
        id: "1",
        title: "Classic Tee",
        category: "Clothing",
        price: 29.99,
        description: "A clean everyday shirt.",
        image: "https://example.com/shirt.png",
      },
    ]);

    renderWithProviders(<Home />);

    expect(await screen.findByText("Classic Tee")).toBeInTheDocument();
    expect(screen.getByText("Clothing", { selector: "p" })).toBeInTheDocument();
    expect(screen.getByText("$29.99")).toBeInTheDocument();
  });

  it("adds a product to the cart from the product card", async () => {
    fetchProducts.mockResolvedValue([
      {
        id: "1",
        title: "Classic Tee",
        category: "Clothing",
        price: 29.99,
        description: "A clean everyday shirt.",
        image: "https://example.com/shirt.png",
      },
    ]);

    const store = createTestStore();
    const user = userEvent.setup();

    renderWithProviders(<Home />, { store });

    await user.click(await screen.findByRole("button", { name: "Add to Cart" }));

    await waitFor(() => {
      expect(store.getState().cart.items).toHaveLength(1);
      expect(store.getState().cart.items[0]).toMatchObject({
        id: "1",
        title: "Classic Tee",
        price: 29.99,
        quantity: 1,
      });
    });
  });
});