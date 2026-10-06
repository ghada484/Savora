import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getRecipeById } from "../../services/api";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";

import "./FoodDetails.css";

function FoodDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getRecipeById(id);
        setRecipe(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load this dish.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(recipe);

    showToast(`${recipe.name} added to cart.`);
  };

  if (loading) {
    return (
      <main className="details-status">
        <p>Loading dish...</p>
      </main>
    );
  }

  if (error || !recipe) {
    return (
      <main className="details-status">
        <h2>{error || "Dish not found."}</h2>

        <Link
          to="/menu"
          className="primary-btn"
        >
          Back to Menu
        </Link>
      </main>
    );
  }

  return (
    <main className="food-details">
      {/* IMAGE */}

      <section className="details-hero">
        <div className="details-image">
          <img
            src={recipe.image}
            alt={recipe.name}
          />
        </div>

        {/* INFO */}

        <div className="details-info">
          <span className="eyebrow">
            {recipe.cuisine}
          </span>

          <h1>{recipe.name}</h1>

          <div className="details-rating">
            <span>
              ★ {recipe.rating}
            </span>

            <span>
              {recipe.reviewCount} reviews
            </span>
          </div>

          <p className="details-description">
            A delicious dish made with carefully
            selected ingredients and prepared to
            bring out every layer of flavor.
          </p>

          <div className="details-stats">
            <div>
              <span>Calories</span>
              <strong>
                {recipe.caloriesPerServing}
              </strong>
            </div>

            <div>
              <span>Servings</span>
              <strong>
                {recipe.servings}
              </strong>
            </div>

            <div>
              <span>Prep time</span>
              <strong>
                {recipe.prepTimeMinutes} min
              </strong>
            </div>

            <div>
              <span>Cook time</span>
              <strong>
                {recipe.cookTimeMinutes} min
              </strong>
            </div>
          </div>

          <div className="details-actions">
            <button
              className="primary-btn"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>

            <Link
              to="/menu"
              className="secondary-btn"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>

      {/* INGREDIENTS */}

      <section className="details-section section">
        <div className="container">
          <div className="details-section-header">
            <span className="eyebrow">
              WHAT'S INSIDE
            </span>

            <h2 className="section-title">
              Ingredients
            </h2>
          </div>

          <div className="ingredients-grid">
            {recipe.ingredients.map(
              (ingredient, index) => (
                <div
                  className="ingredient"
                  key={index}
                >
                  <span>
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <p>{ingredient}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* INSTRUCTIONS */}

      <section className="instructions-section section">
        <div className="container instructions-container">
          <div>
            <span className="eyebrow">
              FROM THE KITCHEN
            </span>

            <h2 className="section-title">
              How it's prepared
            </h2>
          </div>

          <div className="instructions-list">
            {recipe.instructions.map(
              (instruction, index) => (
                <div
                  className="instruction"
                  key={index}
                >
                  <span>
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <p>{instruction}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default FoodDetails;

