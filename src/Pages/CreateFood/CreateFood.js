import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";

import "./CreateFood.css";

function CreateFood() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    cuisine: "",
    caloriesPerServing: "",
    image: "",
    description: "",
    ingredients: "",
    rating: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (
      !formData.name ||
      !formData.cuisine ||
      !formData.caloriesPerServing ||
      !formData.image ||
      !formData.description
    ) {
      setError("Please complete all required fields.");
      return;
    }

    const savedFoods =
      JSON.parse(localStorage.getItem("savoraFoods")) || [];

    const newFood = {
      id: `custom-${Date.now()}`,
      name: formData.name,
      cuisine: formData.cuisine,
      caloriesPerServing: Number(formData.caloriesPerServing),
      image: formData.image,
      description: formData.description,
      ingredients: formData.ingredients
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      rating: Number(formData.rating) || 0,
      custom: true,
    };

    localStorage.setItem(
      "savoraFoods",
      JSON.stringify([...savedFoods, newFood])
    );

    showToast("Food added successfully.");

    setTimeout(() => {
      navigate("/admin/menu");
    }, 300);
  };

  return (
    <main className="create-food-page">
      <div className="container">
        <section className="create-food-header">
          <div>
            <span className="dashboard-label">
              Restaurant Management
            </span>

            <h1>Add New Food</h1>

            <p>
              Create a new dish and add it to your restaurant menu.
            </p>
          </div>
        </section>

        <section className="create-food-card">
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="form-error">
                {error}
              </div>
            )}

            <div className="form-section">
              <div className="form-section-heading">
                <span>01</span>

                <div>
                  <h2>Basic Information</h2>

                  <p>
                    Tell customers about the dish.
                  </p>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group form-group-full">
                  <label htmlFor="name">
                    Food Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="e.g. Truffle Pasta"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cuisine">
                    Cuisine
                  </label>

                  <input
                    id="cuisine"
                    name="cuisine"
                    type="text"
                    placeholder="e.g. Italian"
                    value={formData.cuisine}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="caloriesPerServing">
                    Calories
                  </label>

                  <input
                    id="caloriesPerServing"
                    name="caloriesPerServing"
                    type="number"
                    min="0"
                    placeholder="e.g. 450"
                    value={formData.caloriesPerServing}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group form-group-full">
                  <label htmlFor="image">
                    Image URL
                  </label>

                  <input
                    id="image"
                    name="image"
                    type="url"
                    placeholder="https://example.com/food.jpg"
                    value={formData.image}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group form-group-full">
                  <label htmlFor="description">
                    Description
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    rows="5"
                    placeholder="Describe the dish..."
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-heading">
                <span>02</span>

                <div>
                  <h2>Menu Details</h2>

                  <p>
                    Add ingredients and customer rating.
                  </p>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group form-group-full">
                  <label htmlFor="ingredients">
                    Ingredients
                  </label>

                  <input
                    id="ingredients"
                    name="ingredients"
                    type="text"
                    placeholder="Pasta, Cream, Parmesan, Truffle"
                    value={formData.ingredients}
                    onChange={handleChange}
                  />

                  <small>
                    Separate ingredients with commas.
                  </small>
                </div>

                <div className="form-group">
                  <label htmlFor="rating">
                    Rating
                  </label>

                  <input
                    id="rating"
                    name="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    placeholder="e.g. 4.8"
                    value={formData.rating}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="create-food-actions">
              <button
                type="button"
                className="cancel-food-button"
                onClick={() => navigate("/admin/menu")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-food-button"
              >
                Save Food
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

export default CreateFood;
