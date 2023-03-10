import axios from "axios";

const goodMeals = {
  post: function (endpoint, data) {
    return axios({
      method: "POST",
      url: `${import.meta.env.VITE_BACKEND_URL}${endpoint}`,
      data: data,
    });
  },
  get: function (endpoint) {
    return axios({
      method: "GET",
      url: `${import.meta.env.VITE_BACKEND_URL}${endpoint}`,
    });
  },
};

export const apiUtilService = (() => {
  function handleRegisterUser(data) {
    const endpoint = "/signup";
    return goodMeals.post(endpoint, data).then((res) => res.data);
  }

  function handleLoginUser(data) {
    const endpoint = "/login";
    return goodMeals.post(endpoint, data).then((res) => res.data);
  }

  function handleAddNutritionDetails(data) {
    const endpoint = "/nutrition-details";
    return goodMeals.post(endpoint, data).then((res) => res.data);
  }

  function handleFetchRecipes(params) {
    const endpoint = "/recipes?" + params;
    return goodMeals.get(endpoint).then((res) => res.data);
  }

  function handleFetchRecipeDetails(id) {
    const endpoint = "/recipes/" + id;
    return goodMeals.get(endpoint).then((res) => res.data);
  }

  function handleSaveMealPlan(data) {
    const endpoint = "/meal-plans";
    return goodMeals.post(endpoint, data).then((res) => res.data);
  }

  function handleGetUserDetails(id) {
    const endpoint = "/user/" + id;
    return goodMeals.get(endpoint).then((res) => res.data);
  }

  return {
    handleLoginUser: handleLoginUser,
    handleRegisterUser: handleRegisterUser,
    handleFetchRecipes: handleFetchRecipes,
    handleSaveMealPlan: handleSaveMealPlan,
    handleGetUserDetails: handleGetUserDetails,
    handleFetchRecipeDetails: handleFetchRecipeDetails,
    handleAddNutritionDetails: handleAddNutritionDetails,
  };
})();
