import React, { useContext } from "react";
import { Container, Table, Button, Alert } from "react-bootstrap";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { items, removeFromCart, clearCart } = useContext(CartContext);

  const total = items.reduce(
    (s, it) => s + (it.price || 0) * (it.quantity || 0),
    0,
  );

  if (!items || items.length === 0) {
    return (
      <Container className="py-5">
        <Alert variant="info">Your cart is empty.</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">Cart</h2>
      <Table responsive bordered>
        <thead>
          <tr>
            <th>Product</th>
            <th className="text-end">Price</th>
            <th className="text-center">Qty</th>
            <th className="text-end">Subtotal</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.id}>
              <td className="align-middle">
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={it.image}
                    alt={it.title}
                    style={{ width: 56, height: 56, objectFit: "contain" }}
                  />
                  <div>{it.title}</div>
                </div>
              </td>
              <td className="align-middle text-end">
                ${(it.price || 0).toFixed(2)}
              </td>
              <td className="align-middle text-center">{it.quantity}</td>
              <td className="align-middle text-end">
                ${((it.price || 0) * (it.quantity || 0)).toFixed(2)}
              </td>
              <td className="align-middle text-end">
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => removeFromCart(it.id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center">
        <div>
          <Button variant="secondary" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>
        <div className="fs-4 fw-bold">Total: ${total.toFixed(2)}</div>
      </div>
    </Container>
  );
}
