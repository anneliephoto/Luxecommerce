import React from "react";
import { useSelector } from "react-redux";
import {
  createHashRouter,
  RouterProvider,
  Outlet,
  Link,
} from "react-router-dom";
import { Navbar, Nav, Container as RBContainer } from "react-bootstrap";
import Home from "./pages/Home";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Cart from "./pages/Cart";
import "./App.css";

function AppLayout() {
  const items = useSelector((state) => state.cart.items);

  const count = items.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  return (
    <>
      <Navbar
        expand="md"
        className="navbar-modern"
      >
        <RBContainer>
          <Navbar.Brand
            as={Link}
            to="/"
            className="brand-modern"
          >
            ✨ FakeStore
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-nav" />

          <Navbar.Collapse id="main-nav" className="justify-content-end">
            <Nav className="nav-modern">
              <Nav.Link
                as={Link}
                to="/"
                className="nav-link-modern"
              >
                Home
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/products"
                className="nav-link-modern"
              >
                Products
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/add-product"
                className="nav-link-modern"
              >
                Add Product
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/cart"
                className="nav-link-modern"
              >
                Cart{" "}
                <span className="cart-count-modern">({count})</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </RBContainer>
      </Navbar>

      <Outlet />
    </>
  );
}

const router = createHashRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <ProductListing /> },
      { path: "add-product", element: <AddProduct /> },
      { path: "products/:id", element: <ProductDetails /> },
      { path: "products/:id/edit", element: <EditProduct /> },
      { path: "cart", element: <Cart /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;