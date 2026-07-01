import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../store/cartSlice";

export function createTestStore(preloadedState) {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState,
  });
}

export function renderWithProviders(ui, { store = createTestStore(), route = "/" } = {}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const Wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </Provider>
    </QueryClientProvider>
  );

  return {
    store,
    queryClient,
    ...render(ui, { wrapper: Wrapper }),
  };
}