import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useOrders } from "../../context/OrderContext";

import "./MyOrders.css";

function MyOrders() {
  const { getUserOrders } = useOrders();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(getUserOrders());
  }, [getUserOrders]);

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
        month: "short",
        year: "numeric",
      }
    );
  };

  const getItemsCount = (items = []) => {
    return items.reduce(
      (total, item) =>
        total + Number(item.quantity || 0),
      0
    );
  };

  const getStatusClass = (status) => {
    return `order-status status-${String(
      status || "Pending"
    )
      .toLowerCase()
      .replaceAll(" ", "-")}`;
  };

  if (orders.length === 0) {
    return (
      <main className="empty-orders">
        <span className="eyebrow">
          MY ORDERS
        </span>

        <h1>
          No orders yet.
        </h1>

        <p>
          Your previous orders will appear here.
        </p>

        <Link
          to="/menu"
          className="primary-btn"
        >
          Explore Menu
        </Link>
      </main>
    );
  }

  return (
    <main className="orders-page">

      <section className="orders-header">

        <div className="container">

          <span className="eyebrow">
            MY ORDERS
          </span>

          <h1>
            Your orders
          </h1>

          <p>
            Keep track of your Savora orders in one place.
          </p>

        </div>

      </section>

      <section className="orders-content section">

        <div className="container">

          <div className="orders-list">

            {orders.map((order) => {

              const items = order.items || [];

              const status =
                order.status || "Pending";

              return (
                <article
                  className="order-card"
                  key={order.id}
                >

                  <div className="order-card-top">

                    <div>

                      <span className="order-label">
                        ORDER NUMBER
                      </span>

                      <h2>
                        #{String(order.id).slice(-6)}
                      </h2>

                    </div>

                    <span
                      className={getStatusClass(
                        status
                      )}
                    >
                      {status}
                    </span>

                  </div>

                  <div className="order-card-info">

                    <div>
                      <span>
                        Date
                      </span>

                      <strong>
                        {formatDate(
                          order.createdAt
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Items
                      </span>

                      <strong>
                        {getItemsCount(items)} items
                      </strong>
                    </div>

                    <div>
                      <span>
                        Payment
                      </span>

                      <strong>
                        {order.paymentMethod ||
                          "Cash on Delivery"}
                      </strong>
                    </div>

                    <div>
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

                  </div>

                  <div className="order-card-bottom">

                    <div className="order-preview">

                      {items
                        .slice(0, 3)
                        .map((item, index) => (

                          <img
                            key={
                              item.id ||
                              item.foodId ||
                              index
                            }
                            src={item.image}
                            alt={
                              item.name ||
                              item.title ||
                              "Food"
                            }
                          />

                        ))}

                    </div>

                    <Link
                      to={`/orders/${order.id}`}
                      state={{ order }}
                      className="secondary-btn"
                    >
                      View Details
                    </Link>

                  </div>

                </article>
              );
            })}

          </div>

        </div>

      </section>

    </main>
  );
}

export default MyOrders;