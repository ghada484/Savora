import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getRecipes } from "../../services/api";
import { useToast } from "../../context/ToastContext";

import "./ManageMenu.css";

function ManageMenu() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCuisine, setSelectedCuisine] =
    useState("All");
  const [loading, setLoading] = useState(true);

  const { showToast } = useToast();

  useEffect(() => {
    const loadFoods = async () => {
      try {
        setLoading(true);

        const response = await getRecipes();

        const apiFoods = response.recipes || [];

        const savedFoods =
          JSON.parse(
            localStorage.getItem("savoraFoods")
          ) || [];

        /*
          Create a map of saved foods by ID.

          This allows us to replace an API food
          with its edited local version.
        */
        const savedFoodsMap = new Map(
          savedFoods.map((food) => [
            String(food.id),
            food,
          ])
        );

        /*
          Replace API food with the saved version
          if the admin has edited it before.
        */
        const mergedApiFoods = apiFoods.map(
          (apiFood) => {
            const savedFood =
              savedFoodsMap.get(
                String(apiFood.id)
              );

            return savedFood
              ? {
                  ...apiFood,
                  ...savedFood,
                }
              : apiFood;
          }
        );

        /*
          Custom foods have IDs beginning with
          "custom-".

          They don't exist in the API, so we add
          them separately.
        */
        const customFoods =
          savedFoods.filter((food) =>
            String(food.id).startsWith(
              "custom-"
            )
          );

        setFoods([
          ...mergedApiFoods,
          ...customFoods,
        ]);
      } catch (error) {
        console.error(
          "Failed to load menu:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadFoods();
  }, []);

  const cuisines = [
    "All",
    ...new Set(
      foods
        .map((food) => food.cuisine)
        .filter(Boolean)
    ),
  ];

  const filteredFoods = foods.filter((food) => {
    const foodName =
      food.name || "";

    const matchesSearch =
      foodName
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    const matchesCuisine =
      selectedCuisine === "All" ||
      food.cuisine === selectedCuisine;

    return (
      matchesSearch &&
      matchesCuisine
    );
  });

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this item?"
    );

    if (!confirmed) {
      return;
    }

    const foodToDelete = foods.find(
      (food) =>
        String(food.id) === String(id)
    );

    const savedFoods =
      JSON.parse(
        localStorage.getItem("savoraFoods")
      ) || [];

    /*
      Remove the food from localStorage.

      This works for custom foods and for
      edited API foods.
    */
    const updatedSavedFoods =
      savedFoods.filter(
        (food) =>
          String(food.id) !== String(id)
      );

    localStorage.setItem(
      "savoraFoods",
      JSON.stringify(
        updatedSavedFoods
      )
    );

    /*
      Remove it from the current screen.
    */
    setFoods((currentFoods) =>
      currentFoods.filter(
        (food) =>
          String(food.id) !== String(id)
      )
    );

    showToast(
      `${foodToDelete?.name || "Food item"} deleted successfully.`
    );
  };

  if (loading) {
    return (
      <main className="manage-menu-page">
        <div className="container">
          <div className="menu-loading">
            Loading menu...
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="manage-menu-page">
      <div className="container">

        <section className="manage-menu-header">

          <div>

            <span className="dashboard-label">
              Restaurant Management
            </span>

            <h1>
              Manage Menu
            </h1>

            <p>
              Add, edit and organize the dishes
              available on Savora.
            </p>

          </div>

          <Link
            to="/admin/menu/create"
            className="primary-btn"
          >
            Add New Food
          </Link>

        </section>

        <section className="menu-controls">

          <div className="menu-search">

            <input
              type="text"
              placeholder="Search dishes..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

          </div>

          <div className="cuisine-filters">

            {cuisines.map((cuisine) => (

              <button
                key={cuisine}
                className={
                  selectedCuisine === cuisine
                    ? "cuisine-filter active"
                    : "cuisine-filter"
                }
                onClick={() =>
                  setSelectedCuisine(cuisine)
                }
              >
                {cuisine}
              </button>

            ))}

          </div>

        </section>

        <section className="manage-menu-grid">

          {filteredFoods.length === 0 ? (

            <div className="no-menu-results">

              <h2>
                No dishes found
              </h2>

              <p>
                Try another search or cuisine.
              </p>

            </div>

          ) : (

            filteredFoods.map((food) => (

              <article
                className="manage-food-card"
                key={food.id}
              >

                <div className="manage-food-image">

                  <img
                    src={food.image}
                    alt={food.name}
                  />

                  <span>
                    {food.cuisine}
                  </span>

                </div>

                <div className="manage-food-content">

                  <div>

                    <h2>
                      {food.name}
                    </h2>

                    <p>
                      {food.caloriesPerServing}
                      {" "}
                      calories
                    </p>

                  </div>

                  <div className="manage-food-actions">

                    <Link
                      to={`/admin/menu/edit/${food.id}`}
                      className="edit-food-button"
                    >
                      Edit
                    </Link>

                    <button
                      className="delete-food-button"
                      onClick={() =>
                        handleDelete(food.id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </article>

            ))

          )}

        </section>

      </div>
    </main>
  );
}

export default ManageMenu;