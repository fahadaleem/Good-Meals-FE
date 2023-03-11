<template>
  <div class="max-w-[600px] mx-auto h-full rounded-[30px] overflow-hidden">
    <!-- Recipe image -->
    <div class="h-[300px] rounded-[30px] overflow-hidden relative">
      <button
        @click="onCloseDetailPage"
        class="absolute top-4 left-4 bg-neutral-100 rounded-full p-2 opacity-[0.6]"
      >
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
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
      </button>
      <img
        v-if="recipeDetails.image_url"
        :src="recipeDetails.image_url"
        class="h-full w-full object-cover"
        alt="recipe-image"
      />
      <!-- fallback image -->
      <img
        v-else
        src="/recipe-image.png"
        class="h-full w-full object-cover"
        alt="recipe-image"
      />
    </div>
    <!-- Recipe Details -->
    <div class="p-8 rounded-[30px] bg-neutral-450 relative top-[-50px]">
      <!-- Title and action button -->
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">{{ recipeDetails.recipe }}</h1>
        <!-- Action buttons -->
        <div class="flex gap-x-4">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              class="w-6 h-6 text-red-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
          <!-- Select recipe button -->
          <button v-if="!isRecipeSelected" @click="onSelectRecipe">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
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
          <button v-else>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Preparation time -->
      <div class="my-4">
        <h2 class="font-normal text-xl my-4">Preparation Time</h2>
        <!-- Nutrition Details -->
        <div class="grid grid-cols-2 gap-8">
          <div class="col-span-1 flex items-center gap-x-4">
            <h2 class="bg-neutral-100 rounded-2xl p-4 font-bold text-2xl">
              {{ recipeDetails.calories }}
            </h2>
            <p class="font-bold text-2xl">Calories</p>
          </div>
          <div class="col-span-1 flex items-center gap-x-4">
            <h2 class="bg-neutral-100 rounded-2xl p-4 font-bold text-2xl">
              {{ recipeDetails.protein }}
            </h2>
            <p class="font-bold text-2xl">Protein</p>
          </div>
          <div class="col-span-1 flex items-center gap-x-4">
            <h2 class="bg-neutral-100 rounded-2xl p-4 font-bold text-2xl">
              {{ recipeDetails.fat }}
            </h2>
            <p class="font-bold text-2xl">Fat</p>
          </div>
          <div class="col-span-1 flex items-center gap-x-4">
            <h2 class="bg-neutral-100 rounded-2xl p-4 font-bold text-2xl">
              {{ recipeDetails.carbs }}
            </h2>
            <p class="font-bold text-2xl">Carbs</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { apiUtilService } from "../../utils/apiUtilService";
import { recipesUtilService } from "../../utils/recipesUtilService";

export default {
  name: "recipe-details",
  props: {
    viewedRecipeId: Number,
  },
  data() {
    return {
      recipeDetails: {},
    };
  },
  computed: {
    isRecipeSelected() {
      const self = this;
      return recipesUtilService.isRecipeSelected(
        self.$store.state.user.meal_plan,
        self.recipeDetails?.recipe
      );
    },
  },
  created() {
    const self = this;
    self.fetchRecipeDetails();
  },
  methods: {
    onCloseDetailPage() {
      const self = this;
      self.$emit("onCloseRecipeDetails");
    },
    onSelectRecipe() {
      const self = this;
      self.$emit("onSelectRecipe", self.recipeDetails);
    },
    fetchRecipeDetails() {
      const self = this;
      apiUtilService
        .handleFetchRecipeDetails(self.viewedRecipeId)
        .then((res) => {
          if (res.success) {
            self.recipeDetails = res.data;
          }
        });
    },
  },
};
</script>
