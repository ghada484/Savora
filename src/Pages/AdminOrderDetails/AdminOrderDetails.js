import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useToast } from "../../context/ToastContext";

import "./AdminOrderDetails.css";

function AdminOrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { showToast } = useToast();

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const savedOrders =
      JSON.parse(
        localStorage.getItem("savoraOrders")
      ) || [];

    const foundOrder = savedOrders.find(
      (item) =>
        String(item.id) === String(id)
    );

    if (foundOrder) {
      setOrder(foundOrder);

      setStatus(
        foundOrder.status || "Pending"
      );
    }
  }, [id]);

  const updateStatus = (newStatus) => {
    const savedOrders =
      JSON.parse(
        localStorage.getItem("savoraOrders")
      ) || [];

    const updatedOrders = savedOrders.map(
      (item) =>
        String(item.id) === String(id)
          ? {
              ...item,
              status: newStatus,
            }
          : item
    );

    localStorage.setItem(
      "savoraOrders",
      JSON.stringify(updatedOrders)
    );

    setOrder((currentOrder) => ({
      ...currentOrder,
      status: newStatus,
    }));

    setStatus(newStatus);

    showToast(
      `Order status updated to ${newStatus}.`
    );
  };

  const getCustomer = () => {
    return (
      order?.customer ||
      {}
    );
  };

  const getCustomerName = () => {
    const customer = getCustomer();

    return (
      customer.fullName ||
      customer.name ||
      order?.customerName ||
      "Unknown Customer"
    );
  };

  const getCustomerEmail = () => {
    const customer = getCustomer();

    return (
      customer.email ||
      order?.email ||
      "No email provided"
    );
  };

  const getCustomerPhone = () => {
    const customer = getCustomer();

    return (
      customer.phone ||
      order?.phone ||
      "No phone provided"
    );
  };

  const getAddress = () => {
    const customer = getCustomer();

    return (
      order?.address ||
      customer.address ||
      order?.deliveryAddress ||
      "No address provided"
    );
  };

  const getItems = () => {
    return (
      order?.items ||
      order?.cartItems ||
      order?.products ||
      []
    );
  };

  const getItemName = (item) => {
    return (
      item.name ||
      item.title ||
      item.foodName ||
      "Food Item"
    );
  };

  const getItemQuantity = (item) => {
    return (
      item.quantity ||
      item.qty ||
      1
    );
  };

  const getItemPrice = (item) => {
    return Number(
      item.price ||
      item.unitPrice ||
      item.amount ||
      0
    );
  };

  const getTotal = () => {
    if (order?.total !== undefined) {
      return Number(order.total);
    }

    return getItems().reduce(
      (total, item) =>
        total +
        getItemPrice(item) *
          getItemQuantity(item),
      0
    );
  };

  const formatDate = () => {
    const date =
      order?.createdAt ||
      order?.date;

    if (!date) {
      return "No date available";
    }

    const parsedDate =
      new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return date;
    }

    return parsedDate.toLocaleDateString(
      "en-US",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  if (!order) {
    return (
      <main className="admin-order-details-page">

        <div className="container">

          <div className="admin-order-not-found">

            <span className="dashboard-label">
              Restaurant Management
            </span>

            <h1>
              Order Not Found
            </h1>

            <p>
              This order could not be found in
              the restaurant records.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/admin/orders")
              }
            >
              Back to Orders
            </button>

          </div>

        </div>

      </main>
    );
  }

  const items = getItems();

  return (
    <main className="admin-order-details-page">

      <div className="container">

        <section className="admin-order-header">

          <div>

            <Link
              to="/admin/orders"
              className="back-orders-link"
            >
              Back to Orders
            </Link>

            <span className="dashboard-label">
              Restaurant Management
            </span>

            <h1>
              Order #
              {String(order.id).slice(-6)}
            </h1>

            <p>
              Review order information and
              manage its current status.
            </p>

          </div>

          <div className="admin-order-status-box">

            <span>
              Current Status
            </span>

            <select
              value={status}
              onChange={(event) =>
                updateStatus(
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

        </section>

        <section className="admin-order-layout">

          <div className="admin-order-main">

            <div className="admin-order-card">

              <div className="admin-card-heading">

                <div>

                  <span>
                    Order Information
                  </span>

                  <h2>
                    Ordered Items
                  </h2>

                </div>

                <strong>
                  {items.length} items
                </strong>

              </div>

              {items.length === 0 ? (

                <div className="no-order-items">

                  <p>
                    No item details are available
                    for this order.
                  </p>

                </div>

              ) : (

                <div className="admin-order-items">

                  {items.map(
                    (item, index) => (

                      <div
                        className="admin-order-item"
                        key={
                          item.id ||
                          item.foodId ||
                          index
                        }
                      >

                        <div className="admin-item-image">

                          {item.image ? (

                            <img
                              src={item.image}
                              alt={getItemName(
                                item
                              )}
                            />

                          ) : (

                            <span>
                              Food
                            </span>

                          )}

                        </div>

                        <div className="admin-item-info">

                          <h3>
                            {getItemName(item)}
                          </h3>

                          <p>
                            Quantity:{" "}
                            {getItemQuantity(
                              item
                            )}
                          </p>

                        </div>

                        <strong className="admin-item-price">

                          {(
                            getItemPrice(item) *
                            getItemQuantity(item)
                          ).toFixed(2)}{" "}
                          EGP

                        </strong>

                      </div>

                    )
                  )}

                </div>

              )}

              <div className="admin-order-total">

                <span>
                  Order Total
                </span>

                <strong>
                  {getTotal().toFixed(2)} EGP
                </strong>

              </div>

            </div>

          </div>

          <aside className="admin-order-sidebar">

            <div className="admin-order-card">

              <div className="admin-card-heading">

                <div>

                  <span>
                    Customer
                  </span>

                  <h2>
                    Customer Details
                  </h2>

                </div>

              </div>

              <div className="customer-details">

                <div className="customer-detail">

                  <span>
                    Name
                  </span>

                  <strong>
                    {getCustomerName()}
                  </strong>

                </div>

                <div className="customer-detail">

                  <span>
                    Email
                  </span>

                  <strong>
                    {getCustomerEmail()}
                  </strong>

                </div>

                <div className="customer-detail">

                  <span>
                    Phone
                  </span>

                  <strong>
                    {getCustomerPhone()}
                  </strong>

                </div>

                <div className="customer-detail">

                  <span>
                    Delivery Address
                  </span>

                  <strong>
                    {getAddress()}
                  </strong>

                </div>

              </div>

            </div>

            <div className="admin-order-card">

              <div className="admin-card-heading">

                <div>

                  <span>
                    Order Details
                  </span>

                  <h2>
                    Summary
                  </h2>

                </div>

              </div>

              <div className="order-summary-details">

                <div>

                  <span>
                    Order Number
                  </span>

                  <strong>
                    #{String(
                      order.id
                    ).slice(-6)}
                  </strong>

                </div>

                <div>

                  <span>
                    Order Date
                  </span>

                  <strong>
                    {formatDate()}
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

                <div className="summary-total">

                  <span>
                    Total
                  </span>

                  <strong>
                    {getTotal().toFixed(2)} EGP
                  </strong>

                </div>

              </div>

            </div>

          </aside>

        </section>

      </div>

    </main>
  );
}

export default AdminOrderDetails;