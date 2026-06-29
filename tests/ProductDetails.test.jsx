import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductDetails from '../src/pages/ProductDetails';
import cartReducer from '../src/store/cartSlice';
import { fetchProductById } from '../src/services/firestore';

jest.mock('../src/services/firestore', () => ({
  fetchProductById: jest.fn(),
  deleteProduct: jest.fn(),
}));

function renderComponent() {
  const store = configureStore({
    reducer: { cart: cartReducer },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/products/123']}>
        <Routes>
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
}

describe('ProductDetails', () => {
  beforeEach(() => {
    sessionStorage.clear();
    fetchProductById.mockReset();
  });

  it('renders product details and shows a success message when adding to cart', async () => {
    fetchProductById.mockResolvedValue({
      id: '123',
      title: 'Test Headphones',
      price: 89.99,
      image: 'headphones.jpg',
      category: 'Audio',
      description: 'Great sound',
    });

    const user = userEvent.setup();
    renderComponent();

    expect(await screen.findByText('Test Headphones')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /add to cart/i }));

    expect(await screen.findByText(/added to cart/i)).toBeInTheDocument();
  });

  it('updates the cart when a user adds a product', async () => {
    fetchProductById.mockResolvedValue({
      id: '123',
      title: 'Test Headphones',
      price: 89.99,
      image: 'headphones.jpg',
      category: 'Audio',
      description: 'Great sound',
    });

    const user = userEvent.setup();
    const store = configureStore({
      reducer: { cart: cartReducer },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/products/123']}>
          <Routes>
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await screen.findByText('Test Headphones');
    await user.click(screen.getByRole('button', { name: /add to cart/i }));

    await waitFor(() => {
      expect(store.getState().cart.items).toHaveLength(1);
    });

    expect(store.getState().cart.items[0]).toMatchObject({
      id: '123',
      title: 'Test Headphones',
      quantity: 1,
    });
  });
});
