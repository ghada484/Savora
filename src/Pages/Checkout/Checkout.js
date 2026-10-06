import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useOrders } from "../../context/OrderContext";
import { useToast } from "../../context/ToastContext";

import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    cartSubtotal,
    deliveryFee,
    cartTotal,
  } = useCart();

  const { createOrder } = useOrders();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    notes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState(
    "Cash on Delivery"
  );

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName =
        "Please enter your full name.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        "Please enter your phone number.";
    }

    if (!formData.email.trim()) {
      newErrors.email =
        "Please enter your email.";
    }

    if (!formData.address.trim()) {
      newErrors.address =
        "Please enter your delivery address.";
    }

    if (!formData.city.trim()) {
      newErrors.city =
        "Please enter your city.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      showToast(
        "Please complete the required fields.",
        "error"
      );

      return;
    }

    const order = createOrder({
      items: cartItems,

      customer: {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        notes: formData.notes.trim(),
      },

      paymentMethod,

      subtotal: cartSubtotal,

      deliveryFee,

      total: cartTotal,
    });

    localStorage.setItem(
      "savoraLastOrder",
      JSON.stringify(order)
    );

    showToast("Order placed successfully.");

    setTimeout(() => {
      navigate("/order-confirmation");
    }, 300);
  };

  if (cartItems.length === 0) {
    return (
      <main className="empty-checkout">

        <span className="eyebrow">
          CHECKOUT
        </span>

        <h1>
          Your cart is empty.
        </h1>

        <p>
          Add some dishes before continuing to checkout.
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
    <main className="checkout-page">

      <section className="checkout-header">

        <div className="container">

          <span className="eyebrow">
            CHECKOUT
          </span>

          <h1>
            Complete your order
          </h1>

          <p>
            Tell us where to deliver your food.
          </p>

        </div>

      </section>

      <section className="checkout-content section">

        <div className="container checkout-layout">

          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >

            <div className="checkout-section">

              <div className="checkout-section-heading">

                <span>
                  01
                </span>

                <div>

                  <h2>
                    Customer Information
                  </h2>

                  <p>
                    Enter your contact details.
                  </p>

                </div>

              </div>

              <div className="form-grid">

                <div className="form-group full-width">

                  <label htmlFor="fullName">
                    Full Name
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />

                  {errors.fullName && (
                    <small>
                      {errors.fullName}
                    </small>
                  )}

                </div>

                <div className="form-group">

                  <label htmlFor="phone">
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="01XXXXXXXXX"
                  />

                  {errors.phone && (
                    <small>
                      {errors.phone}
                    </small>
                  )}

                </div>

                <div className="form-group">

                  <label htmlFor="email">
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />

                  {errors.email && (
                    <small>
                      {errors.email}
                    </small>
                  )}

                </div>

              </div>

            </div>

            <div className="checkout-section">

              <div className="checkout-section-heading">

                <span>
                  02
                </span>

                <div>

                  <h2>
                    Delivery Address
                  </h2>

                  <p>
                    Where should we deliver your order?
                  </p>

                </div>

              </div>

              <div className="form-grid">

                <div className="form-group full-width">

                  <label htmlFor="address">
                    Address
                  </label>

                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street, building and apartment"
                  />

                  {errors.address && (
                    <small>
                      {errors.address}
                    </small>
                  )}

                </div>

                <div className="form-group full-width">

                  <label htmlFor="city">
                    City
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                  />

                  {errors.city && (
                    <small>
                      {errors.city}
                    </small>
                  )}

                </div>

                <div className="form-group full-width">

                  <label htmlFor="notes">
                    Delivery Notes
                    <span>
                      Optional
                    </span>
                  </label>

                  <textarea
                    id="notes"
                    name="notes"
                    rows="4"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Any special instructions for delivery?"
                  />

                </div>

              </div>

            </div>

            <div className="checkout-section">

              <div className="checkout-section-heading">

                <span>
                  03
                </span>

                <div>

                  <h2>
                    Payment Method
                  </h2>

                  <p>
                    Choose how you would like to pay.
                  </p>

                </div>

              </div>

              <div className="payment-options">

                <label
                  className={`payment-option ${
                    paymentMethod ===
                    "Cash on Delivery"
                      ? "selected"
                      : ""
                  }`}
                >

                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash on Delivery"
                    checked={
                      paymentMethod ===
                      "Cash on Delivery"
                    }
                    onChange={(event) =>
                      setPaymentMethod(
                        event.target.value
                      )
                    }
                  />

                  <div>

                    <strong>
                      Cash on Delivery
                    </strong>

                    <span>
                      Pay when your order arrives.
                    </span>

                  </div>

                </label>

              </div>

            </div>

            <button
              type="submit"
              className="primary-btn place-order-btn"
            >
              Place Order
            </button>

          </form>

          <aside className="checkout-summary">

            <span className="eyebrow">
              YOUR ORDER
            </span>

            <h2>
              Order Summary
            </h2>

            <div className="checkout-items">

              {cartItems.map((item) => (

                <div
                  className="checkout-item"
                  key={item.id}
                >

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="checkout-item-info">

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      {item.quantity} ×{" "}
                      {item.price} EGP
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

            <div className="summary-divider" />

            <div className="summary-row">

              <span>
                Subtotal
              </span>

              <strong>
                {cartSubtotal.toFixed(0)} EGP
              </strong>

            </div>

            <div className="summary-row">

              <span>
                Delivery
              </span>

              <strong>
                {deliveryFee} EGP
              </strong>

            </div>

            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                {cartTotal.toFixed(0)} EGP
              </strong>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}

export default Checkout;