import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";

// Persistent state
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

// Create a new store instance.
const store = createStore({
  state() {
    return {
      user: null,
      recipe: {
        recipeDetails: {
          selectedRecipeId: null,
        },
      },
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    handleLogout(state) {
      state.user = null;
    },
  },
  getters: {
    isUserLoggedIn(state) {
      return !!state.user;
    },
    userFullName(state) {
      return `${state.user.first_name} ${state.user.last_name}`;
    },
    getUserNumberOfMeals(state) {
      return state.user.nutrition_details.number_of_meals;
    },
  },
  plugins: [vuexLocal.plugin],
});

export default store;
