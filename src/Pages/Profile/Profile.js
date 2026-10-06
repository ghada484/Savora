import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const {
    user,
    updateUser,
    logout,
  } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    updateUser({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
    });

    setMessage("Your profile has been updated successfully.");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <main className="profile-page">

      <section className="profile-header">

        <div className="container">

          <span className="eyebrow">
            MY ACCOUNT
          </span>

          <h1>
            Your profile
          </h1>

          <p>
            Manage your personal information and
            account details.
          </p>

        </div>

      </section>

      <section className="profile-content section">

        <div className="container profile-layout">

          <div className="profile-main">

            <div className="profile-card">

              <div className="profile-card-heading">

                <div>

                  <span className="card-label">
                    PERSONAL INFORMATION
                  </span>

                  <h2>
                    Account details
                  </h2>

                </div>

              </div>

              {message && (
                <div className="profile-success">
                  {message}
                </div>
              )}

              <form
                className="profile-form"
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
                  />

                </div>

                <button
                  type="submit"
                  className="primary-btn"
                >
                  Save Changes
                </button>

              </form>

            </div>

          </div>

          <aside className="profile-sidebar">

            <div className="profile-account-card">

              <span className="card-label">
                ACCOUNT
              </span>

              <div className="profile-avatar">
                {user.name
                  ?.charAt(0)
                  .toUpperCase()}
              </div>

              <h2>
                {user.name}
              </h2>

              <p>
                {user.email}
              </p>

              <span className="profile-role">
                Customer
              </span>

            </div>

            <div className="profile-actions">

              <button
                className="profile-action"
                onClick={() => navigate("/orders")}
              >
                My Orders
              </button>

              <button
                className="profile-action logout-action"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}

export default Profile;