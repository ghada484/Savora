import { Link } from "react-router-dom";

import "./NotFound.css";

function NotFound() {
  return (
    <main className="not-found-page">

      <div className="container">

        <div className="not-found-content">

          <span className="not-found-number">
            404
          </span>

          <span className="eyebrow">
            PAGE NOT FOUND
          </span>

          <h1>
            Looks like this page
            <br />
            isn't on the menu.
          </h1>

          <p>
            The page you're looking for may have been
            moved, removed or doesn't exist.
          </p>

          <div className="not-found-actions">

            <Link
              to="/"
              className="primary-btn"
            >
              Back to Home
            </Link>

            <Link
              to="/menu"
              className="secondary-btn"
            >
              Explore Menu
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}

export default NotFound;