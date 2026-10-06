import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import "./OrderConfirmation.css";

function OrderConfirmation() {
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrder =
      JSON.parse(
        localStorage.getItem("savoraLastOrder")
      );

    if (!savedOrder) {
      navigate("/menu");
      return;
    }

    setOrder(savedOrder);
  }, [navigate]);

  if (!order) {
    return null;
  }

  const orderDate = new Date(
    order.createdAt
  ).toLocaleDateString("en-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="confirmation-page">

      <section className="confirmation-hero">

        <div className="confirmation-icon">
          ✓
        </div>

        <span className="eyebrow">
          ORDER CONFIRMED
        </span>

        <h1>
          Thank you for your order.
        </h1>

        <p>
          Your order has been received and is being prepared.
        </p>

      </section>

      <section className="confirmation-content section">

        <div className="container confirmation-layout">

          <div className="confirmation-main">

            <div className="confirmation-card">

              <div className="confirmation-card-header">

                <div>
                  <span className="card-label">
                    ORDER NUMBER
                  </span>

                  <h2>
                    #{order.id}
                  </h2>
                </div>

                <span className="order-status">
                  {order.status}
                </span>

              </div>

              <div className="order-meta">

                <div>
                  <span>
                    Order Date
                  </span>

                  <strong>
                    {orderDate}
                  </strong>
                </div>

                <div>
                  <span>
                    Payment
                  </span>

                  <strong>
                    {order.paymentMethod}
                  </strong>
                </div>

              </div>

            </div>

            <div className="confirmation-card">

              <span className="card-label">
                ORDER ITEMS
              </span>

              <div className="confirmation-items">

                {order.items.map((item) => (

                  <div
                    className="confirmation-item"
                    key={item.id}
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div>

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        {item.quantity} × {item.price} EGP
                      </p>

                    </div>

                    <strong>
                      {(
                        item.quantity *
                        item.price
                      ).toFixed(0)}{" "}
                      EGP
                    </strong>

                  </div>

                ))}

              </div>

            </div>

            <div className="confirmation-card">

              <span className="card-label">
                DELIVERY DETAILS
              </span>

              <div className="delivery-details">

                <div>
                  <span>
                    Customer
                  </span>

                  <strong>
                    {order.customer.fullName}
                  </strong>
                </div>

                <div>
                  <span>
                    Phone
                  </span>

                  <strong>
                    {order.customer.phone}
                  </strong>
                </div>

                <div>
                  <span>
                    Address
                  </span>

                  <strong>
                    {order.customer.address}
                  </strong>
                </div>

                <div>
                  <span>
                    City
                  </span>

                  <strong>
                    {order.customer.city}
                  </strong>
                </div>

              </div>

              {order.customer.notes && (
                <div className="delivery-notes">

                  <span>
                    Delivery Notes
                  </span>

                  <p>
                    {order.customer.notes}
                  </p>

                </div>
              )}

            </div>

          </div>

          <aside className="confirmation-summary">

            <span className="eyebrow">
              ORDER SUMMARY
            </span>

            <h2>
              Your total
            </h2>

            <div className="summary-row">

              <span>
                Subtotal
              </span>

              <strong>
                {order.subtotal.toFixed(0)} EGP
              </strong>

            </div>

            <div className="summary-row">

              <span>
                Delivery
              </span>

              <strong>
                {order.deliveryFee} EGP
              </strong>

            </div>

            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                {order.total.toFixed(0)} EGP
              </strong>

            </div>

            <div className="confirmation-actions">

              <Link
                to="/orders"
                className="primary-btn"
              >
                View My Orders
              </Link>

              <Link
                to="/menu"
                className="secondary-btn"
              >
                Continue Shopping
              </Link>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}

export default OrderConfirmation;