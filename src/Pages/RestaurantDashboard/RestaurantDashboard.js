import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./RestaurantDashboard.css";

function RestaurantDashboard() {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("savoraOrders")) || [];

    setOrders(savedOrders);

    const savedFoods = JSON.parse(localStorage.getItem("savoraFoods")) || [];

    setFoods(savedFoods);
  }, []);

  const totalRevenue = orders.reduce(
    (total, order) => total + Number(order.total || 0),
    0,
  );

  const confirmedOrders = orders.filter(
    (order) => order.status === "Confirmed",
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered",
  ).length;

  return (
    <main className="dashboard-page">
      <div className="container">
        <section className="dashboard-header">
          <div>
            <span className="dashboard-label">Restaurant Management</span>

            <h1>Welcome back, {user?.name}</h1>

            <p>Manage your restaurant, menu and orders from one place.</p>
          </div>
        </section>

        <section className="dashboard-stats">
          <div className="stat-card">
            <span className="stat-label">Total Orders</span>

            <strong>{orders.length}</strong>

            <p>All customer orders</p>
          </div>

          <div className="stat-card">
            <span className="stat-label">Revenue</span>

            <strong>{totalRevenue} EGP</strong>

            <p>Total order value</p>
          </div>

          <div className="stat-card">
            <span className="stat-label">Confirmed</span>

            <strong>{confirmedOrders}</strong>

            <p>Orders awaiting preparation</p>
          </div>

          <div className="stat-card">
            <span className="stat-label">Delivered</span>

            <strong>{deliveredOrders}</strong>

            <p>Completed orders</p>
          </div>
        </section>

        <section className="dashboard-content">
          <div className="dashboard-panel">
            <div className="panel-header">
              <div>
                <span className="panel-label">Recent Activity</span>

                <h2>Recent Orders</h2>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="empty-dashboard">
                <h3>No orders yet</h3>

                <p>Customer orders will appear here.</p>
              </div>
            ) : (
              <div className="orders-table">
                <div className="table-row table-head">
                  <span>Order</span>
                  <span>Customer</span>
                  <span>Status</span>
                  <span>Total</span>
                </div>

                {orders.slice(0, 5).map((order) => (
                  <div className="table-row" key={order.id}>
                    <span>#{String(order.id).slice(-6)}</span>

                    <span>{order.customer?.fullName}</span>

                    <span>
                      <span
                        className={`status status-${order.status
                          ?.toLowerCase()
                          .replaceAll(" ", "-")}`}
                      >
                        {order.status}
                      </span>
                    </span>

                    <span>{order.total} EGP</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="dashboard-panel menu-summary">
            <div className="panel-header">
              <div>
                <span className="panel-label">Menu</span>

                <h2>Menu Overview</h2>
              </div>
            </div>

            <div className="menu-number">
              <strong>{foods.length}</strong>

              <span>Custom menu items</span>
            </div>

            <Link to="/admin/menu" className="dashboard-button">
              Manage Menu
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default RestaurantDashboard;
