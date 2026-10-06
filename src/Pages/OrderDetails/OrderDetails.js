import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { useEffect, useState } from "react";

import { useOrders } from "../../context/OrderContext";

import "./OrderDetails.css";

function OrderDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { getOrderById } = useOrders();

  const [order, setOrder] = useState(
    location.state?.order || null
  );

  useEffect(() => {
    const latestOrder = getOrderById(id);

    if (latestOrder) {
      setOrder(latestOrder);
    } else {
      navigate("/orders");
    }
  }, [id, getOrderById, navigate]);

  if (!order) {
    return null;
  }

  const customer = order.customer || {};
  const items = order.items || [];

  const formatDate = (date) => {
    if (!date) {
      return "No date";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "No date";
    }

    return parsedDate.toLocaleDateString(
      "en-EG",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  const formatTime = (date) => {
    if (!date) {
      return "No time";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "No time";
    }

    return parsedDate.toLocaleTimeString(
      "en-EG",
      {
        hour: "numeric",
        minute: "2-digit",
      }
    );
  };

  const getStatusClass = (status) => {
    return `order-status status-${String(
      status || "Pending"
    )
      .toLowerCase()
      .replaceAll(" ", "-")}`;
  };

  return (
    <main className="order-details-page">

      <section className="order-details-header">

        <div className="container">

          <Link
            to="/orders"
            className="back-link"
          >
            Back to My Orders
          </Link>

          <div className="order-details-heading">

            <div>

              <span className="eyebrow">
                ORDER DETAILS
              </span>

              <h1>
                Order #
                {String(order.id).slice(-6)}
              </h1>

            </div>

            <span
              className={getStatusClass(
                order.status
              )}
            >
              {order.status || "Pending"}
            </span>

          </div>

        </div>

      </section>

      <section className="order-details-content section">

        <div className="container order-details-layout">

          <div className="order-details-main">

            <div className="details-card">

              <div className="details-card-heading">

                <div>

                  <span className="card-label">
                    ORDER INFORMATION
                  </span>

                  <h2>
                    Order overview
                  </h2>

                </div>

              </div>

              <div className="order-info-grid">

                <div>

                  <span>
                    Order Number
                  </span>

                  <strong>
                    #{String(order.id).slice(-6)}
                  </strong>

                </div>

                <div>

                  <span>
                    Order Date
                  </span>

                  <strong>
                    {formatDate(
                      order.createdAt
                    )}
                  </strong>

                </div>

                <div>

                  <span>
                    Order Time
                  </span>

                  <strong>
                    {formatTime(
                      order.createdAt
                    )}
                  </strong>

                </div>

                <div>

                  <span>
                    Payment Method
                  </span>

                  <strong>
                    {order.paymentMethod ||
                      "Cash on Delivery"}
                  </strong>

                </div>

              </div>

            </div>

            <div className="details-card">

              <span className="card-label">
                ORDER ITEMS
              </span>

              <div className="details-items">

                {items.length === 0 ? (

                  <div className="no-order-items">
                    <p>
                      No items found for this order.
                    </p>
                  </div>

                ) : (

                  items.map((item, index) => (

                    <div
                      className="details-item"
                      key={
                        item.id ||
                        item.foodId ||
                        index
                      }
                    >

                      <div className="details-item-image">

                        {item.image ? (

                          <img
                            src={item.image}
                            alt={
                              item.name ||
                              item.title ||
                              "Food"
                            }
                          />

                        ) : (

                          <span>
                            Food
                          </span>

                        )}

                      </div>

                      <div className="details-item-info">

                        <span>
                          {item.cuisine ||
                            "Savora"}
                        </span>

                        <h3>
                          {item.name ||
                            item.title ||
                            "Food Item"}
                        </h3>

                        <p>
                          {Number(
                            item.quantity || 1
                          )}{" "}
                          ×{" "}
                          {Number(
                            item.price || 0
                          ).toFixed(0)}{" "}
                          EGP
                        </p>

                      </div>

                      <strong>

                        {(
                          Number(
                            item.quantity || 1
                          ) *
                          Number(
                            item.price || 0
                          )
                        ).toFixed(0)}{" "}
                        EGP

                      </strong>

                    </div>

                  ))

                )}

              </div>

            </div>

            <div className="details-card">

              <span className="card-label">
                DELIVERY INFORMATION
              </span>

              <div className="delivery-info">

                <div>

                  <span>
                    Customer
                  </span>

                  <strong>
                    {customer.fullName ||
                      customer.name ||
                      "No name provided"}
                  </strong>

                </div>

                <div>

                  <span>
                    Phone
                  </span>

                  <strong>
                    {customer.phone ||
                      "No phone provided"}
                  </strong>

                </div>

                <div>

                  <span>
                    Email
                  </span>

                  <strong>
                    {customer.email ||
                      "No email provided"}
                  </strong>

                </div>

                <div>

                  <span>
                    City
                  </span>

                  <strong>
                    {customer.city ||
                      "No city provided"}
                  </strong>

                </div>

                <div className="full-detail">

                  <span>
                    Address
                  </span>

                  <strong>
                    {customer.address ||
                      "No address provided"}
                  </strong>

                </div>

              </div>

              {customer.notes && (

                <div className="delivery-notes">

                  <span>
                    Delivery Notes
                  </span>

                  <p>
                    {customer.notes}
                  </p>

                </div>

              )}

            </div>

          </div>

          <aside className="order-details-summary">

            <span className="eyebrow">
              PAYMENT SUMMARY
            </span>

            <h2>
              Order total
            </h2>

            <div className="summary-row">

              <span>
                Subtotal
              </span>

              <strong>
                {Number(
                  order.subtotal || 0
                ).toFixed(0)}{" "}
                EGP
              </strong>

            </div>

            <div className="summary-row">

              <span>
                Delivery
              </span>

              <strong>
                {Number(
                  order.deliveryFee || 0
                ).toFixed(0)}{" "}
                EGP
              </strong>

            </div>

            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                {Number(
                  order.total || 0
                ).toFixed(0)}{" "}
                EGP
              </strong>

            </div>

            <div className="payment-status">

              <span>
                Payment Method
              </span>

              <strong>
                {order.paymentMethod ||
                  "Cash on Delivery"}
              </strong>

              <p>
                Payment will be collected when your
                order arrives.
              </p>

            </div>

            <Link
              to="/menu"
              className="primary-btn details-menu-btn"
            >
              Order More Food
            </Link>

          </aside>

        </div>

      </section>

    </main>
  );
}

export default OrderDetails;