import { Link } from "react-router-dom";

import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="container">

        <div className="footer-main">

          <div className="footer-brand">

            <Link
              to="/"
              className="footer-logo"
            >
              Savora
            </Link>

            <p>
              Thoughtful food.
              <br />
              Beautifully served.
            </p>

          </div>

          <div className="footer-column">

            <span className="footer-heading">
              Explore
            </span>

            <Link to="/">
              Home
            </Link>

            <Link to="/menu">
              Menu
            </Link>

            <Link to="/about">
              About
            </Link>

          </div>

          <div className="footer-column">

            <span className="footer-heading">
              Account
            </span>

            <Link to="/profile">
              Profile
            </Link>

            <Link to="/orders">
              My Orders
            </Link>

            <Link to="/cart">
              Cart
            </Link>

          </div>

          <div className="footer-column">

            <span className="footer-heading">
              Contact
            </span>

            <a href="mailto:hello@savora.com">
              hello@savora.com
            </a>

            <a href="tel:+201000000000">
              +20 100 000 0000
            </a>

            <span>
              Cairo, Egypt
            </span>

          </div>

        </div>

        <div className="footer-bottom">

          <p>
            © {new Date().getFullYear()} Savora.
            All rights reserved.
          </p>

          <p>
            Crafted with care.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;