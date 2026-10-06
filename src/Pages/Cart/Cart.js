import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";

import "./Cart.css";

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    deliveryFee,
    cartTotal,
  } = useCart();

  const { showToast } = useToast();

  const handleIncrease = (id) => {
    increaseQuantity(id);
    showToast("Cart updated.");
  };

  const handleDecrease = (id) => {
    decreaseQuantity(id);
    showToast("Cart updated.");
  };

  const handleRemove = (item) => {
    removeFromCart(item.id);
    showToast(`${item.name} removed from cart.`);
  };

  const handleClearCart = () => {
    clearCart();
    showToast("Cart cleared.");
  };

  if (cartItems.length === 0) {
    return (
      <main className="empty-cart">

        <span className="eyebrow">
          YOUR CART
        </span>

        <h1>
          Your cart is empty.
        </h1>

        <p>
          Looks like you haven't added anything yet.
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
    <main className="cart-page">

      <section className="cart-header">
        <div className="container">

          <span className="eyebrow">
            YOUR ORDER
          </span>

          <h1>
            Shopping Cart
          </h1>

        </div>
      </section>

      <section className="cart-content section">

        <div className="container cart-layout">

          <div className="cart-items">

            <div className="cart-top">

              <p>
                {cartItems.length} different dishes
              </p>

              <button
                className="clear-cart"
                onClick={handleClearCart}
              >
                Clear cart
              </button>

            </div>

            {cartItems.map((item) => (

              <article
                className="cart-item"
                key={item.id}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-item-info">

                  <span>
                    {item.cuisine}
                  </span>

                  <h2>
                    {item.name}
                  </h2>

                  <p>
                    {item.caloriesPerServing} calories
                  </p>

                  <strong>
                    {item.price} EGP
                  </strong>

                </div>

                <div className="quantity-controls">

                  <button
                    onClick={() =>
                      handleDecrease(item.id)
                    }
                  >
                    -
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      handleIncrease(item.id)
                    }
                  >
                    +
                  </button>

                </div>

                <button
                  className="remove-item"
                  onClick={() =>
                    handleRemove(item)
                  }
                >
                  Remove
                </button>

              </article>

            ))}

          </div>

          <aside className="cart-summary">

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

            <Link
              to="/checkout"
              className="primary-btn checkout-btn"
            >
              Proceed to Checkout
            </Link>

          </aside>

        </div>

      </section>

    </main>
  );
}

export default Cart;