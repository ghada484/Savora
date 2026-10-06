import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

import "./Navbar.css";

function Navbar() {
  const {
    user,
    isAuthenticated,
    isAdmin,
    logout,
  } = useAuth();

  const { cartCount } = useCart();

  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();

    setIsMenuOpen(false);

    navigate("/");
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="navbar">

      <div className="navbar-container">

        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
        >
          Savora
        </Link>

        <nav
          className={`navbar-links ${
            isMenuOpen ? "active" : ""
          }`}
        >

          <NavLink
            to="/"
            className="nav-link"
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/menu"
            className="nav-link"
            onClick={closeMenu}
          >
            Menu
          </NavLink>

          <NavLink
            to="/about"
            className="nav-link"
            onClick={closeMenu}
          >
            About
          </NavLink>

          {isAuthenticated && (
            <NavLink
              to="/orders"
              className="nav-link"
              onClick={closeMenu}
            >
              Orders
            </NavLink>
          )}

          {isAdmin && (
  <>
    <NavLink
      to="/admin"
      className="nav-link"
      onClick={closeMenu}
    >
      Dashboard
    </NavLink>

    <NavLink
      to="/admin/orders"
      className="nav-link"
      onClick={closeMenu}
    >
      Manage Orders
    </NavLink>
  </>
)}
        </nav>

        <div className="navbar-actions">

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="login-link"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="register-link"
              >
                Create Account
              </Link>
            </>
          ) : (
            <div className="user-menu">

              <Link
                to="/profile"
                className="user-name"
              >
                {user.name}
              </Link>

              <button
                className="logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>
          )}

          <Link
            to="/cart"
            className="cart-button"
          >
            Cart

            <span className="cart-count">
              {cartCount}
            </span>
          </Link>

        </div>

        <button
          className="mobile-menu-button"
          onClick={() =>
            setIsMenuOpen(!isMenuOpen)
          }
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>

      </div>

    </header>
  );
}

export default Navbar;