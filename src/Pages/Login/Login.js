import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from || "/";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      const message =
        "Please enter your email and password.";

      setError(message);
      showToast(message, "error");

      return;
    }

    setIsLoading(true);

    const result = login(
      formData.email.trim(),
      formData.password
    );

    setIsLoading(false);

    if (!result.success) {
      setError(result.message);
      showToast(result.message, "error");

      return;
    }

    showToast("Login successful.");

    setTimeout(() => {
      navigate(from, {
        replace: true,
      });
    }, 300);
  };

  return (
    <main className="auth-page">
      <section className="auth-layout">
        <div className="auth-image">
          <div className="auth-image-overlay">
            <span className="eyebrow">
              WELCOME BACK
            </span>

            <h1>
              Come hungry. Leave happy.
            </h1>

            <p>
              Sign in to keep your orders,
              favorites, and Savora experience
              in one place.
            </p>
          </div>
        </div>

        <div className="auth-content">
          <div className="auth-form-wrapper">
            <span className="eyebrow">
              SIGN IN
            </span>

            <h2>
              Welcome back
            </h2>

            <p className="auth-description">
              Sign in to your Savora account
              to continue ordering.
            </p>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </div>

              <button
                type="submit"
                className="primary-btn auth-submit"
                disabled={isLoading}
              >
                {isLoading
                  ? "Signing In..."
                  : "Sign In"}
              </button>
            </form>

            <p className="auth-switch">
              Don't have an account?

              <Link to="/register">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
