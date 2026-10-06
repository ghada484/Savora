import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getRecipeById } from "../../services/api";
import { useToast } from "../../context/ToastContext";

import "./EditFood.css";

function EditFood() {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFood = async () => {
      try {
        setLoading(true);
        setError("");

        const savedFoods =
          JSON.parse(
            localStorage.getItem("savoraFoods")
          ) || [];

        const savedFood = savedFoods.find(
          (item) =>
            String(item.id) === String(id)
        );

        let food = savedFood;

        /*
          If the food isn't saved locally,
          load it from the API.
        */
        if (!food) {
          food = await getRecipeById(id);
        }

        if (!food) {
          setError("Food item not found.");
          setLoading(false);
          return;
        }

        setFormData({
          name: food.name || "",
          cuisine:
            food.cuisine || "International",
          caloriesPerServing:
            food.caloriesPerServing || 0,
          image: food.image || "",
          description:
            food.description ||
            "A delicious dish from Savora.",
          ingredients:
            Array.isArray(food.ingredients)
              ? food.ingredients.join(", ")
              : "",
          rating: food.rating || 0,
        });

        setLoading(false);
      } catch (error) {
        console.error(
          "Failed to load food:",
          error
        );

        setError(
          "Unable to load this food item."
        );

        setLoading(false);
      }
    };

    loadFood();
  }, [id]);

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

    /*
      Only Food Name is required.

      Other fields can be empty because some
      API recipes may not contain all fields.
    */
    if (!formData.name.trim()) {
      setError(
        "Please enter a food name."
      );

      return;
    }

    const savedFoods =
      JSON.parse(
        localStorage.getItem("savoraFoods")
      ) || [];

    const updatedFood = {
      id: id,

      name: formData.name.trim(),

      cuisine:
        formData.cuisine.trim() ||
        "International",

      caloriesPerServing:
        Number(
          formData.caloriesPerServing
        ) || 0,

      image:
        formData.image.trim(),

      description:
        formData.description.trim() ||
        "A delicious dish from Savora.",

      ingredients:
        formData.ingredients
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

      rating:
        Number(formData.rating) || 0,

      /*
        Mark this as the locally edited
        version of the API food.
      */
      custom: true,
    };

    const existingFoodIndex =
      savedFoods.findIndex(
        (food) =>
          String(food.id) === String(id)
      );

    let updatedFoods;

    if (existingFoodIndex !== -1) {
      updatedFoods = savedFoods.map(
        (food, index) =>
          index === existingFoodIndex
            ? updatedFood
            : food
      );
    } else {
      updatedFoods = [
        ...savedFoods,
        updatedFood,
      ];
    }

    localStorage.setItem(
      "savoraFoods",
      JSON.stringify(updatedFoods)
    );

    showToast(
      "Food updated successfully."
    );

    setTimeout(() => {
      navigate("/admin/menu");
    }, 300);
  };

  if (loading) {
    return (
      <main className="edit-food-page">
        <div className="container">
          <div className="edit-food-loading">
            Loading food...
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="edit-food-page">
        <div className="container">
          <div className="edit-food-error">
            <h2>{error}</h2>

            <button
              type="button"
              onClick={() =>
                navigate("/admin/menu")
              }
            >
              Back to Menu
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="edit-food-page">
      <div className="container">

        <section className="edit-food-header">
          <div>

            <span className="dashboard-label">
              Restaurant Management
            </span>

            <h1>
              Edit Food
            </h1>

            <p>
              Update the details of this menu item.
            </p>

          </div>
        </section>

        <section className="edit-food-card">

          <form onSubmit={handleSubmit}>

            {error && (
              <div className="edit-form-error">
                {error}
              </div>
            )}

            <div className="edit-form-section">

              <div className="edit-section-heading">

                <span>
                  01
                </span>

                <div>

                  <h2>
                    Basic Information
                  </h2>

                  <p>
                    Update the main information about
                    this dish.
                  </p>

                </div>

              </div>

              <div className="edit-form-grid">

                <div className="edit-form-group edit-full">

                  <label htmlFor="name">
                    Food Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                  />

                </div>

                <div className="edit-form-group">

                  <label htmlFor="cuisine">
                    Cuisine
                  </label>

                  <input
                    id="cuisine"
                    name="cuisine"
                    type="text"
                    value={formData.cuisine}
                    onChange={handleChange}
                  />

                </div>

                <div className="edit-form-group">

                  <label htmlFor="caloriesPerServing">
                    Calories
                  </label>

                  <input
                    id="caloriesPerServing"
                    name="caloriesPerServing"
                    type="number"
                    min="0"
                    value={
                      formData.caloriesPerServing
                    }
                    onChange={handleChange}
                  />

                </div>

                <div className="edit-form-group edit-full">

                  <label htmlFor="image">
                    Image URL
                  </label>

                  <input
                    id="image"
                    name="image"
                    type="url"
                    value={formData.image}
                    onChange={handleChange}
                  />

                </div>

                <div className="edit-form-group edit-full">

                  <label htmlFor="description">
                    Description
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    rows="5"
                    value={
                      formData.description
                    }
                    onChange={handleChange}
                  />

                </div>

              </div>

            </div>

            <div className="edit-form-section">

              <div className="edit-section-heading">

                <span>
                  02
                </span>

                <div>

                  <h2>
                    Menu Details
                  </h2>

                  <p>
                    Update ingredients and rating.
                  </p>

                </div>

              </div>

              <div className="edit-form-grid">

                <div className="edit-form-group edit-full">

                  <label htmlFor="ingredients">
                    Ingredients
                  </label>

                  <input
                    id="ingredients"
                    name="ingredients"
                    type="text"
                    value={
                      formData.ingredients
                    }
                    onChange={handleChange}
                  />

                  <small>
                    Separate ingredients with commas.
                  </small>

                </div>

                <div className="edit-form-group">

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
                    value={formData.rating}
                    onChange={handleChange}
                  />

                </div>

              </div>

            </div>

            <div className="edit-food-actions">

              <button
                type="button"
                className="edit-cancel-button"
                onClick={() =>
                  navigate("/admin/menu")
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="edit-save-button"
              >
                Save Changes
              </button>

            </div>

          </form>

        </section>

      </div>
    </main>
  );
}

export default EditFood;