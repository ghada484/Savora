import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
});

export const getRecipes = async () => {
  const response = await api.get("/recipes");
  return response.data;
};

export const getRecipeById = async (id) => {
  const response = await api.get(`/recipes/${id}`);
  return response.data;
};

export const searchRecipes = async (query) => {
  const response = await api.get(
    `/recipes/search?q=${encodeURIComponent(query)}`
  );

  return response.data;
};

export const getRecipeTags = async () => {
  const response = await api.get("/recipes/tags");
  return response.data;
};

export const getRecipesByTag = async (tag) => {
  const response = await api.get(
    `/recipes/tag/${encodeURIComponent(tag)}`
  );

  return response.data;
};

export default api;