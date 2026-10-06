import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const { register } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

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

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      const message = "Please fill in all fields.";

      setError(message);
      showToast(message, "error");

      return;
    }

    if (formData.password.length < 6) {
      const message =
        "Password must be at least 6 characters.";

      setError(message);
      showToast(message, "error");

      return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      const message = "Passwords do not match.";

      setError(message);
      showToast(message, "error");

      return;
    }

    setIsLoading(true);

    const result = register({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      password: formData.password,
    });

    setIsLoading(false);

    if (!result.success) {
      setError(result.message);
      showToast(result.message, "error");

      return;
    }

    showToast("Account created successfully.");

    setTimeout(() => {
      navigate("/");
    }, 300);
  };

  return (
    <main className="auth-page">
      <section className="auth-layout">
        <div className="auth-image">
          <div className="auth-image-overlay">
            <span className="eyebrow">
              WELCOME TO SAVORA
            </span>

            <h1>
              Good food starts with a good table.
            </h1>

            <p>
              Create your account and make your
              next meal part of the experience.
            </p>
          </div>
        </div>

        <div className="auth-content">
          <div className="auth-form-wrapper">
            <span className="eyebrow">
              CREATE ACCOUNT
            </span>

            <h2>
              Join Savora
            </h2>

            <p className="auth-description">
              Create your account to order your
              favorite dishes and keep track of
              your orders.
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
                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>

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
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
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
                  placeholder="Create a password"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                />
              </div>

              <button
                type="submit"
                className="primary-btn auth-submit"
                disabled={isLoading}
              >
                {isLoading
                  ? "Creating Account..."
                  : "Create Account"}
              </button>
            </form>

            <p className="auth-switch">
              Already have an account?

              <Link to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Register;
