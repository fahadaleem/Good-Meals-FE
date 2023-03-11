<template>
  <div class="container mx-auto h-screen py-4">
    <div v-if="!isShowRecipeDetails">
      <div class="flex justify-between">
        <h1 class="text-4xl font-bold text-center flex-1">Search Recipes</h1>
        <!-- Search button -->
        <search-recipe-modal></search-recipe-modal>
      </div>

      <!-- Recipes Grid -->
      <div class="grid grid-cols-3 gap-12 my-8">
        <div
          :key="recipe.id"
          v-for="recipe in recipes"
          class="col-span-1 rounded-[34px] h-[300px] overflow-hidden p-4 flex flex-col justify-end relative"
        >
          <!-- Recipe image -->
          <div class="absolute w-full h-full bg-pop-pink left-0 bottom-0 z-10">
            <img
              :src="recipe.image_url"
              v-if="isValidImageUrl(recipe.image_url)"
              alt="recipe image"
              class="w-full h-full object-cover"
            />
          </div>
          <div
            class="bg-neutral-400 w-full flex rounded-full px-4 py-2 text-xl font-bold flex justify-between items-center z-20"
          >
            <h2>{{ recipe.recipe }}</h2>
            <!-- Action buttons -->
            <div class="flex items-center gap-x-2">
              <!-- Add to favourite button -->
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-6 h-6 text-red-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>
              <!-- View button -->
              <button @click="onViewedRecipeDetails(recipe.id)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Load More button -->
      <div class="text-center py-4">
        <button
          @click="loadMoreRecipes"
          class="py-3 px-8 rounded-full border-2 border-dark-blue text-dark-blue"
        >
          Load More
        </button>
      </div>
    </div>
    <!-- Recipe Details Component -->
    <recipe-details
      v-else
      :viewed-recipe-id="viewedRecipeId"
      @onSelectRecipe="onSelectRecipe"
      @onCloseRecipeDetails="toggleRecipeDetailState"
    ></recipe-details>
  </div>
</template>
<script>
import { apiUtilService } from "../../utils/apiUtilService";
import { appUtilService } from "../../utils/appUtilsService";
import { recipesUtilService } from "../../utils/recipesUtilService";

// Components
import RecipeDetails from "./RecipeDetails.vue";
import SearchRecipeModal from "./SearchRecipeModal.vue";

export default {
  name: "recipes",
  props: {
    mealPlan: Object,
  },
  data() {
    return {
      recipes: [],
      searchText: "",
      serverError: null,
      pageNo: 1,
      recipesPerPage: recipesUtilService.RECIPES_PER_PAGE,
      viewedRecipeId: null,
      isShowRecipeDetails: false,
    };
  },
  components: {
    recipeDetails: RecipeDetails,
    searchRecipeModal: SearchRecipeModal,
  },
  computed: {
    isValidImageUrl() {
      const self = this;
      const regex = /\.(jpg|jpeg|png|gif)/i;
      return (url) => regex.test(url);
    },
  },
  created() {
    const self = this;
    self.getRecipes();
  },
  methods: {
    getRecipes() {
      const self = this;
      const params = appUtilService.convertObjectIntoQueryParams({
        limit: self.recipesPerPage,
        page: self.pageNo,
        search: self.searchText,
      });

      apiUtilService
        .handleFetchRecipes(params)
        .then((res) => {
          if (res.success) {
            self.recipes = res.data?.recipes || [];
          }
        })
        .catch((err) => {
          self.serverError =
            err.response?.data?.message || "Internal Server Error";
        });
    },
    loadMoreRecipes() {
      const self = this;
      self.recipesPerPage += recipesUtilService.RECIPES_PER_PAGE;
      self.getRecipes();
    },
    onViewedRecipeDetails(recipeId) {
      const self = this;
      self.isShowRecipeDetails = true;
      self.viewedRecipeId = recipeId;
    },
    onSelectRecipe(recipe) {
      const self = this;
      self.$emit("onSelectRecipe", recipe);
    },
    toggleRecipeDetailState() {
      const self = this;
      self.isShowRecipeDetails = !self.isShowRecipeDetails;
    },
  },
};
</script>
