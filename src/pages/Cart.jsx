import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Alert, Table } from "react-bootstrap";
import { removeFromCart, clearCart, updateQuantity } from "../store/cartSlice";

const FALLBACK_IMAGE = "https://via.placeholder.com/80x80?text=No+Image";

export default function Cart() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const items = useSelector((state) => state.cart.items);
	const [checkoutSuccess, setCheckoutSuccess] = React.useState(false);

	const totalItems = items.reduce((sum, item) => sum + (item.quantity || 0), 0);

	const total = items.reduce(
		(sum, item) => sum + (item.price || 0) * (item.quantity || 0),
		0,
	);

	function handleCheckout() {
		dispatch(clearCart());
		setCheckoutSuccess(true);
	}

	return (
		<Container className="py-5">
			<div className="d-flex justify-content-between align-items-center mb-3">
				<h2 className="mb-0">Your Cart</h2>
				<Button variant="secondary" onClick={() => navigate("/products")}>
					Continue Shopping
				</Button>
			</div>

			{checkoutSuccess && (
				<Alert variant="success">
					Checkout complete. Your cart has been cleared.
				</Alert>
			)}

			{items.length === 0 ? (
				<Alert variant="info">Your cart is empty.</Alert>
			) : (
				<Card className="shadow-sm">
					<Card.Body>
						<Table responsive hover>
							<thead>
								<tr>
									<th>Image</th>
									<th>Product</th>
									<th className="text-end">Price</th>
									<th className="text-end">Count</th>
									<th className="text-end">Update</th>
									<th className="text-end">Subtotal</th>
									<th className="text-end">Actions</th>
								</tr>
							</thead>
							<tbody>
								{items.map((item) => (
									<tr key={item.id}>
										<td>
											<img
												src={item.image}
												alt={item.title}
												width="60"
												height="60"
												style={{ objectFit: "contain" }}
												onError={(e) => {
													e.currentTarget.onerror = null;
													e.currentTarget.src = FALLBACK_IMAGE;
												}}
											/>
										</td>
										<td>{item.title}</td>
										<td className="text-end">${(item.price || 0).toFixed(2)}</td>
										<td className="text-end">{item.quantity || 0}</td>
										<td className="text-end">
											<div className="d-inline-flex gap-2">
												<Button
													size="sm"
													variant="outline-secondary"
													onClick={() =>
														dispatch(
															updateQuantity({
																id: item.id,
																quantity: (item.quantity || 0) - 1,
															}),
														)
													}
												>
													-
												</Button>
												<Button
													size="sm"
													variant="outline-secondary"
													onClick={() =>
														dispatch(
															updateQuantity({
																id: item.id,
																quantity: (item.quantity || 0) + 1,
															}),
														)
													}
												>
													+
												</Button>
											</div>
										</td>
										<td className="text-end">
											${((item.price || 0) * (item.quantity || 0)).toFixed(2)}
										</td>
										<td className="text-end">
											<Button
												size="sm"
												variant="danger"
												onClick={() => dispatch(removeFromCart(item.id))}
											>
												Remove
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>

						<div className="d-flex justify-content-between align-items-center mt-3">
							<Button
								variant="outline-secondary"
								onClick={() => dispatch(clearCart())}
							>
								Clear Cart
							</Button>
							<div className="text-end">
								<div className="fw-semibold">Total Items: {totalItems}</div>
								<div className="fs-5 fw-bold">Total Price: ${total.toFixed(2)}</div>
							</div>
						</div>

						<div className="d-flex justify-content-end mt-3">
							<Button variant="primary" onClick={handleCheckout}>
								Checkout
							</Button>
						</div>
					</Card.Body>
				</Card>
			)}
		</Container>
	);
}
