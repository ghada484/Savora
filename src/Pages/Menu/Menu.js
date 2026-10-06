import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import {
  getRecipes,
  getRecipeTags,
  getRecipesByTag,
  searchRecipes,
} from "../../services/api";

import "./Menu.css";

function Menu() {
  const [recipes, setRecipes] = useState([]);
  const [tags, setTags] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const selectedTag = searchParams.get("category") || "";

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await getRecipeTags();
        setTags(data);
      } catch (error) {
        console.error("Failed to load tags:", error);
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError("");

      try {
        let data;

        if (selectedTag) {
          data = await getRecipesByTag(selectedTag);
        } else {
          data = await getRecipes();
        }

        setRecipes(data.recipes);
      } catch (error) {
        console.error(error);
        setError("Failed to load menu.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [selectedTag]);

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!search.trim()) {
      const data = await getRecipes();
      setRecipes(data.recipes);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await searchRecipes(search);
      setRecipes(data.recipes);
    } catch (error) {
      console.error(error);
      setError("Failed to search recipes.");
    } finally {
      setLoading(false);
    }
  };

  const handleCategory = (tag) => {
    if (!tag) {
      setSearchParams({});
      return;
    }

    setSearchParams({
      category: tag,
    });
  };

  return (
    <main className="menu-page">

      {/* MENU HEADER */}

      <section className="menu-header">
        <div className="container">

          <span className="eyebrow">
            SAVORA MENU
          </span>

          <h1>
            Good food,
            <br />
            <span>great choices.</span>
          </h1>

          <p>
            Explore our collection of delicious dishes and
            discover something new to love.
          </p>

        </div>
      </section>

      {/* MENU CONTROLS */}

      <section className="menu-content section">
        <div className="container">

          <div className="menu-toolbar">

            <form
              className="search-form"
              onSubmit={handleSearch}
            >
              <input
                type="text"
                placeholder="Search for a dish..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />

              <button type="submit">
                Search
              </button>
            </form>

          </div>

          {/* CATEGORIES */}

          <div className="menu-categories">

            <button
              className={!selectedTag ? "active" : ""}
              onClick={() => handleCategory("")}
            >
              All
            </button>

            {tags.slice(0, 10).map((tag) => (
              <button
                key={tag}
                className={
                  selectedTag === tag
                    ? "active"
                    : ""
                }
                onClick={() => handleCategory(tag)}
              >
                {tag}
              </button>
            ))}

          </div>

          {/* RESULTS */}

          {loading && (
            <div className="menu-status">
              <p>Loading delicious dishes...</p>
            </div>
          )}

          {error && (
            <div className="menu-status">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="menu-result-header">
                <p>
                  {recipes.length} dishes available
                </p>

                {selectedTag && (
                  <button
                    className="clear-filter"
                    onClick={() => handleCategory("")}
                  >
                    Clear filter
                  </button>
                )}
              </div>

              <div className="menu-grid">

                {recipes.map((recipe) => (
                  <Link
                    to={`/menu/${recipe.id}`}
                    className="menu-card"
                    key={recipe.id}
                  >
                    <div className="menu-card-image">

                      <img
                        src={recipe.image}
                        alt={recipe.name}
                      />

                      <span className="menu-rating">
                        ★ {recipe.rating}
                      </span>

                    </div>

                    <div className="menu-card-content">

                      <span className="menu-card-cuisine">
                        {recipe.cuisine}
                      </span>

                      <h2>
                        {recipe.name}
                      </h2>

                      <div className="menu-card-info">

                        <span>
                          {recipe.caloriesPerServing} cal
                        </span>

                        <span>
                          {recipe.servings} servings
                        </span>

                      </div>

                    </div>
                  </Link>
                ))}

              </div>

              {recipes.length === 0 && (
                <div className="menu-status">
                  <h2>
                    No dishes found
                  </h2>

                  <p>
                    Try another search.
                  </p>
                </div>
              )}
            </>
          )}

        </div>
      </section>

    </main>
  );
}

export default Menu;