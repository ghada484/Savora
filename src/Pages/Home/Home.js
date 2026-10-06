import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getRecipes } from "../../services/api";

import "./Home.css";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes();
        setRecipes(data.recipes);
      } catch (error) {
        console.error("Failed to load recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const featuredRecipes = recipes.slice(0, 6);

  return (
    <main className="home">

      {/* HERO */}

      <section className="hero">
        <div className="hero-container">

          <div className="hero-content">
            <span className="hero-label">
              GOOD FOOD, GOOD MOOD
            </span>

            <h1>
              Food made to
              <span> bring people together.</span>
            </h1>

            <p>
              Discover delicious dishes, explore new flavors,
              and order the food you love from Savora.
            </p>

            <div className="hero-buttons">
              <Link to="/menu" className="primary-btn">
                Explore Menu
              </Link>

              <Link to="/about" className="secondary-btn">
                Our Story
              </Link>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <img
              src={
                recipes[0]?.image ||
                "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
              }
              alt={recipes[0]?.name || "Delicious food"}
              className="hero-image"
            />

            <div className="hero-image-info">
              <span>Today's pick</span>
              <strong>
                {recipes[0]?.name || "Discover something delicious"}
              </strong>
            </div>
          </div>

        </div>
      </section>

      {/* INTRO */}

      <section className="intro section">
        <div className="container intro-container">

          <div>
            <span className="eyebrow">
              THE SAVORA WAY
            </span>

            <h2 className="section-title">
              Simple ingredients.
              <br />
              Unforgettable flavor.
            </h2>
          </div>

          <p className="intro-text">
            At Savora, we believe great food doesn't need to be
            complicated. It's about fresh ingredients, thoughtful
            preparation, and flavors that make you want another bite.
          </p>

        </div>
      </section>

      {/* FEATURED */}

      <section className="featured section">
        <div className="container">

          <div className="section-heading-row">
            <div>
              <span className="eyebrow">
                FROM OUR KITCHEN
              </span>

              <h2 className="section-title">
                Featured dishes
              </h2>
            </div>

            <Link to="/menu" className="text-link">
              View full menu
            </Link>
          </div>

          {loading ? (
            <p className="loading-text">
              Loading our dishes...
            </p>
          ) : (
            <div className="featured-grid">

              {featuredRecipes.map((recipe) => (
                <article
                  className="food-card"
                  key={recipe.id}
                >
                  <div className="food-image-wrapper">

                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="food-image"
                    />

                    <span className="food-rating">
                      ★ {recipe.rating}
                    </span>

                  </div>

                  <div className="food-card-content">

                    <span className="food-cuisine">
                      {recipe.cuisine}
                    </span>

                    <h3>
                      {recipe.name}
                    </h3>

                    <div className="food-meta">
                      <span>
                        {recipe.caloriesPerServing} cal
                      </span>

                      <span>
                        {recipe.servings} servings
                      </span>
                    </div>

                  </div>
                </article>
              ))}

            </div>
          )}

        </div>
      </section>

      {/* CATEGORIES */}

      <section className="categories section">
        <div className="container">

          <div className="categories-heading">
            <span className="eyebrow">
              EXPLORE
            </span>

            <h2 className="section-title">
              What are you craving?
            </h2>
          </div>

          <div className="category-grid">

            <Link to="/menu?category=breakfast">
              <div className="category-card">
                <span>01</span>
                <h3>Breakfast</h3>
                <p>Start your day right.</p>
              </div>
            </Link>

            <Link to="/menu?category=lunch">
              <div className="category-card">
                <span>02</span>
                <h3>Lunch</h3>
                <p>Fresh meals for your day.</p>
              </div>
            </Link>

            <Link to="/menu?category=dinner">
              <div className="category-card">
                <span>03</span>
                <h3>Dinner</h3>
                <p>Something worth staying for.</p>
              </div>
            </Link>

            <Link to="/menu?category=dessert">
              <div className="category-card">
                <span>04</span>
                <h3>Desserts</h3>
                <p>End on a sweet note.</p>
              </div>
            </Link>

          </div>

        </div>
      </section>

      {/* CTA */}

      <section className="home-cta">
        <div className="container home-cta-container">

          <div>
            <span className="eyebrow">
              READY TO EAT?
            </span>

            <h2>
              Your next favorite
              <br />
              meal is waiting.
            </h2>
          </div>

          <Link to="/menu" className="primary-btn">
            Browse the Menu
          </Link>

        </div>
      </section>

    </main>
  );
}

export default Home;