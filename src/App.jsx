import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, Container as RBContainer } from "react-bootstrap";
import Home from "./pages/Home";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import { CartProvider, CartContext } from "./context/CartContext";
import Cart from "./pages/Cart";
import "./App.css";

function AppRouter() {
  const cart = useContext(CartContext);
  const count = cart?.getItemCount ? cart.getItemCount() : 0;

  return (
    <BrowserRouter>
      <Navbar
        expand="md"
        className="navbar-modern"
        style={{
          backgroundColor: "rgba(26, 26, 26, 0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(64, 64, 64, 0.4)",
        }}
      >
        <RBContainer>
          <Navbar.Brand
            as={Link}
            to="/"
            style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#FFFFFF" }}
          >
            ✨ FakeStore
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="ms-auto">
              <Nav.Link
                as={Link}
                to="/"
                style={{ color: "#E8E8E8", fontWeight: "500" }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/products"
                style={{ color: "#E8E8E8", fontWeight: "500" }}
              >
                Products
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/add-product"
                style={{ color: "#E8E8E8", fontWeight: "500" }}
              >
                Add Product
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/cart"
                style={{ color: "#E8E8E8", fontWeight: "500" }}
              >
                Cart{" "}
                <span
                  className="badge"
                  style={{ backgroundColor: "#1A1A1A", marginLeft: "0.5rem" }}
                >
                  {count}
                </span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </RBContainer>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/:id/edit" element={<EditProduct />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <CartProvider>
      <AppRouter />
    </CartProvider>
  );
}

export default App;
