import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useToast } from "../../context/ToastContext";

import "./ManageOrders.css";

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const { showToast } = useToast();

  useEffect(() => {
    try {
      const savedOrders =
        JSON.parse(localStorage.getItem("savoraOrders")) || [];

      setOrders(savedOrders);
    } catch (error) {
      console.error("Failed to load orders:", error);
      setOrders([]);
    }
  }, []);

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      String(order.id) === String(orderId)
        ? { ...order, status: newStatus }
        : order
    );

    setOrders(updatedOrders);

    localStorage.setItem(
      "savoraOrders",
      JSON.stringify(updatedOrders)
    );

    showToast(
      `Order status updated to ${newStatus}.`
    );
  };

  const getCustomerName = (order) =>
    order.customer?.fullName ||
    order.customer?.name ||
    order.customerName ||
    "Unknown Customer";

  const getCustomerEmail = (order) =>
    order.customer?.email ||
    order.email ||
    "No email";

  const getOrderTotal = (order) =>
    Number(order.total || 0);

  const filteredOrders = orders.filter((order) => {
    const orderNumber = String(order.id || "").toLowerCase();
    const customerName = getCustomerName(order).toLowerCase();
    const searchValue = search.trim().toLowerCase();

    const matchesSearch =
      orderNumber.includes(searchValue) ||
      customerName.includes(searchValue);

    const matchesStatus =
      selectedStatus === "All" ||
      (order.status || "Pending") === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const pendingOrders = orders.filter(
    (order) =>
      (order.status || "Pending") === "Pending"
  ).length;

  const confirmedOrders = orders.filter(
    (order) => order.status === "Confirmed"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled"
  ).length;

  const formatOrderId = (id) =>
    `#${String(id).slice(-6)}`;

  const formatDate = (date) => {
    if (!date) return "No date";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return String(date);
    }

    return parsedDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="manage-orders-page">
      <div className="container">

        <section className="manage-orders-header">
          <div>

            <span className="dashboard-label">
              Restaurant Management
            </span>

            <h1>
              Manage Orders
            </h1>

            <p>
              Review customer orders and update their status
              from one place.
            </p>

          </div>
        </section>

        <section className="orders-stats">

          <div className="order-stat-card">
            <span>Total Orders</span>
            <strong>{orders.length}</strong>
            <p>All customer orders</p>
          </div>

          <div className="order-stat-card">
            <span>Pending</span>
            <strong>{pendingOrders}</strong>
            <p>Waiting for confirmation</p>
          </div>

          <div className="order-stat-card">
            <span>Confirmed</span>
            <strong>{confirmedOrders}</strong>
            <p>Orders being prepared</p>
          </div>

          <div className="order-stat-card">
            <span>Delivered</span>
            <strong>{deliveredOrders}</strong>
            <p>Completed orders</p>
          </div>

          <div className="order-stat-card">
            <span>Cancelled</span>
            <strong>{cancelledOrders}</strong>
            <p>Cancelled orders</p>
          </div>

        </section>

        <section className="orders-toolbar">

          <div className="orders-search">

            <input
              type="text"
              placeholder="Search by order or customer..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

          </div>

          <div className="order-status-filters">

            {[
              "All",
              "Pending",
              "Confirmed",
              "Delivered",
              "Cancelled",
            ].map((status) => (

              <button
                key={status}
                type="button"
                className={
                  selectedStatus === status
                    ? "order-filter active"
                    : "order-filter"
                }
                onClick={() =>
                  setSelectedStatus(status)
                }
              >
                {status}
              </button>

            ))}

          </div>

        </section>

        <section className="orders-panel">

          <div className="orders-panel-header">

            <div>

              <span className="panel-label">
                Customer Orders
              </span>

              <h2>
                Order List
              </h2>

            </div>

            <span className="orders-count">
              {filteredOrders.length} orders
            </span>

          </div>

          {filteredOrders.length === 0 ? (

            <div className="orders-empty">

              <div className="orders-empty-icon">
                00
              </div>

              <h3>
                No orders found
              </h3>

              <p>
                Try another search or status filter.
              </p>

            </div>

          ) : (

            <div className="orders-table-wrapper">

              <div className="orders-table">

                <div className="order-row order-table-head">

                  <span>
                    Order
                  </span>

                  <span>
                    Customer
                  </span>

                  <span>
                    Date
                  </span>

                  <span>
                    Total
                  </span>

                  <span>
                    Status
                  </span>

                  <span>
                    Actions
                  </span>

                </div>

                {filteredOrders.map((order) => (

                  <div
                    className="order-row"
                    key={order.id}
                  >

                    <div className="order-id">
                      {formatOrderId(order.id)}
                    </div>

                    <div className="order-customer">

                      <strong>
                        {getCustomerName(order)}
                      </strong>

                      <small>
                        {getCustomerEmail(order)}
                      </small>

                    </div>

                    <div className="order-date">
                      {formatDate(
                        order.date ||
                        order.createdAt
                      )}
                    </div>

                    <div className="order-total">
                      {getOrderTotal(order)} EGP
                    </div>

                    <div>

                      <span
                        className={`order-status status-${String(
                          order.status || "Pending"
                        )
                          .toLowerCase()
                          .replaceAll(" ", "-")}`}
                      >
                        {order.status || "Pending"}
                      </span>

                    </div>

                    <div className="order-update">

                      <Link
                        to={`/admin/orders/${order.id}`}
                        className="view-order-button"
                      >
                        View Details
                      </Link>

                      <select
                        aria-label={`Update status for order ${order.id}`}
                        value={
                          order.status || "Pending"
                        }
                        onChange={(event) =>
                          updateOrderStatus(
                            order.id,
                            event.target.value
                          )
                        }
                      >

                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Confirmed">
                          Confirmed
                        </option>

                        <option value="Delivered">
                          Delivered
                        </option>

                        <option value="Cancelled">
                          Cancelled
                        </option>

                      </select>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          )}

        </section>

      </div>
    </main>
  );
}

export default ManageOrders;