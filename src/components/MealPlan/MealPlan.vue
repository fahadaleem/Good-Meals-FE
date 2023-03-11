<template>
  <div>
    <div v-if="isShowModal">
      <select-recipe-modal
        :is-show-modal="isShowModal"
        :meal-plan="mealPlan"
        @onClickCloseModal="toggleModalState"
        @onSelectRecipe="onSelectRecipe"
      ></select-recipe-modal>
    </div>
    <div
      v-else
      class="max-w-[1000px] mx-auto flex flex-col gap-y-8 justify-center items-center"
    >
      <h1 class="text-4xl font-bold">Meal Plan</h1>
      <div
        class="w-full card-shadow border-[1px] border-neutral-300 p-8 rounded-[34px]"
      >
        <div class="flex flex-col gap-y-2 justify-center text-center">
          <!-- Meal Header -->
          <div class="w-full flex gap-x-4 justify-between my-1">
            <div class="w-32"></div>
            <div class="flex-1">
              <h2 class="text-md font-bold">Recipes</h2>
            </div>
            <div class="flex-1">
              <h2 class="text-md font-bold">Calories</h2>
            </div>
            <div class="flex-1">
              <h2 class="text-md font-bold">Protein</h2>
            </div>
            <div class="flex-1">
              <h2 class="text-md font-bold">Fat</h2>
            </div>
            <div class="flex-1">
              <h2 class="text-md font-bold">Carbs</h2>
            </div>
            <div class="w-4"></div>
          </div>

          <div
            class="w-full items-center gap-x-4 flex justify-between my-2"
            v-for="(meal, mealId) in mealPlan"
            :key="mealId"
          >
            <div class="w-32">
              <h2 class="text-md font-bold">Meal {{ mealId }}</h2>
            </div>

            <div class="flex-1 flex flex-col gap-y-4">
              <div class="flex flex-col gap-y-2">
                <template v-for="(recipe, key) in meal" :key="key">
                  <div class="flex gap-x-4 items-center">
                    <button
                      v-if="recipe.type"
                      @click="onClickSelectRecipeOrItem(mealId, recipe.id)"
                      class="bg-primary flex-1 rounded-full w-full py-3 px-2 text-sm text-neutral-100 inline-block"
                    >
                      {{
                        recipe.recipe_name
                          ? recipe.recipe_name
                          : "Select " + recipe.type
                      }}
                    </button>

                    <div class="flex-1">
                      <input
                        min="1"
                        type="text"
                        disabled="true"
                        placeholder="Calories"
                        :value="recipe.calories"
                        class="py-3 px-4 box-shadow w-full rounded-full border-[1px] text-base border-neutral-300 my-2 outline-primary-color"
                      />
                    </div>
                    <div class="flex-1">
                      <input
                        min="1"
                        type="text"
                        disabled="true"
                        placeholder="Protein"
                        :value="recipe.protein"
                        class="py-3 px-4 box-shadow w-full rounded-full border-[1px] text-base border-neutral-300 my-2 outline-primary-color"
                      />
                    </div>
                    <div class="flex-1">
                      <input
                        min="1"
                        type="text"
                        disabled="true"
                        placeholder="Fat"
                        :value="recipe.fat"
                        class="py-3 px-4 box-shadow w-full rounded-full border-[1px] text-base border-neutral-300 my-2 outline-primary-color"
                      />
                    </div>
                    <div class="flex-1">
                      <input
                        min="1"
                        type="text"
                        disabled="true"
                        placeholder="Carbs"
                        :value="recipe.carbs"
                        class="py-3 px-4 box-shadow w-full rounded-full border-[1px] text-base border-neutral-300 my-2 outline-primary-color"
                      />
                    </div>
                    <div class="w-4">
                      <button @click="onDeleteRecipe(mealId, recipe.id)">
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
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </template>
                <div class="flex gap-x-1">
                  <button
                    @click="onAddItem(mealId, 'recipe')"
                    class="bg-neutral-100 rounded-full py-3 px-6 text-sm text-neutral-600 border-2 border-neutral-600 flex items-center gap-x-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      class="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>

                    Recipe
                  </button>
                  <button
                    @click="onAddItem(mealId, 'item')"
                    class="bg-neutral-100 rounded-full py-3 px-6 text-sm text-neutral-600 border-2 border-neutral-600 flex items-center gap-x-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      class="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                    Item
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Submit meal button -->
      <div class="text-right w-full">
        <button
          @click="onSaveMeal"
          :disabled="!isAllMealValuesEntered"
          class="bg-primary-color w-48 rounded-full py-3 px-8 text-neutral-100 disabled:bg-neutral-400"
        >
          Save your meal
        </button>
      </div>
      <toast-notification
        v-if="serverResponse.message"
        :message="serverResponse.message"
        :type="serverResponse.success ? 'success' : 'error'"
      ></toast-notification>
    </div>
  </div>
</template>
<script>
import { v4 as uuidv4 } from "uuid";
import { appUtilService } from "../../utils/appUtilsService";
import { apiUtilService } from "../../utils/apiUtilService";
import lodashCloneDeep from "lodash/cloneDeep";

import SelectRecipeModal from "./SelectRecipeModal.vue";
import ToastNotification from "../ToastNotification.vue";
export default {
  name: "meal-plan",
  data() {
    return {
      selectedMealId: null,
      selectedRecipeId: null,
      mealPlan: {},
      userNutritionDetails: {},
      isShowModal: false,
      serverResponse: {
        message: "",
        success: false,
      },
    };
  },
  components: {
    selectRecipeModal: SelectRecipeModal,
    toastNotification: ToastNotification,
  },
  created() {
    const self = this;
    self.mapMealPlan();
  },
  computed: {
    totalMealCalories() {
      return (mealId) => {
        const self = this;

        // Get the recipe array for the specified meal ID.
        const recipes = self.mealPlan[mealId];

        // Use Array.reduce() to sum up the calories of all the recipes in the meal.
        const totalCalories = recipes.reduce((accumulator, recipe) => {
          // For each recipe, add its calorie value to the accumulator.
          return accumulator + recipe.calories;
        }, 0);

        // Return the total calorie count.
        return totalCalories;
      };
    },
    isAllMealValuesEntered() {
      const self = this; // 'this' refers to the object that this method is attached to.
      const isRecipesAdded = Object.values(self.mealPlan).every(
        (recipe) => recipe.length
      ); // Checks if every value in the mealPlan object is an array with at least one element.

      // returns true if all values in an object are truthy, and false otherwise.
      return isRecipesAdded && appUtilService.checkObjectValues(self.mealPlan);
    },
  },
  methods: {
    mapNumberOfMeals() {
      const self = this;
      for (let i = 1; i <= self.$store.getters.getUserNumberOfMeals; i++) {
        self.mealPlan[i] = [];
      }
    },
    mapMealPlan() {
      const self = this;
      if (!self.$store.state.user.meal_plan) {
        self.mapNumberOfMeals();
      } else {
        self.mealPlan = Object.assign({}, self.$store.state.user.meal_plan);
      }
    },
    onAddItem(mealNumber, type) {
      const self = this;
      self.mealPlan[mealNumber].push({
        type: type,
        fat: "",
        carbs: "",
        protein: "",
        calories: "",
        recipe_name: "",
        id: uuidv4(),
      });
    },
    /**
     * This function updates a recipe in the meal plan based on the user's selection.
     *
     * @param {Object} recipe - The recipe object that the user selected.
     */
    onSelectRecipe(recipe) {
      // Store a reference to the current instance of the class, since it is used inside a callback function.
      const self = this;
      // Create a deep copy of the meal plan object to avoid modifying it directly.
      const mealPlanDeepCopy = lodashCloneDeep(self.mealPlan);

      // Find the recipe to update in the meal plan for the selected meal ID and recipe key.
      const recipeToUpdate = mealPlanDeepCopy[self.selectedMealId].find(
        (mealRecipeObject) => mealRecipeObject.id === self.selectedRecipeId
      );

      // If the recipe to update exists, update its properties with the selected recipe's values.
      if (recipeToUpdate) {
        recipeToUpdate.recipe_name = recipe.recipe;
        recipeToUpdate.fat = recipe.fat;
        recipeToUpdate.protein = recipe.protein;
        recipeToUpdate.carbs = recipe.carbs;
        recipeToUpdate.calories = recipe.calories;
      }
      // Update the component's mealPlan data property with the updated meal plan object.
      self.mealPlan = mealPlanDeepCopy;

      // Call the toggleModalState function to close the modal.
      self.toggleModalState();
    },
    onDeleteRecipe(mealId, recipeId) {
      const self = this;
      self.mealPlan[mealId] = self.mealPlan[mealId].filter(
        (recipe) => recipe.id !== recipeId
      );
    },
    /**
     * This function handles the click event when the user selects a recipe or item from the meal plan.
     *
     * @param {string} mealPlanId - The ID of the meal plan that the recipe or item belongs to.
     * @param {string} recipeKey - The unique key of the recipe or item in the meal plan.
     */
    onClickSelectRecipeOrItem(mealPlanId, recipeKey) {
      // Store a reference to the current instance of the class, since it is used inside a callback function.
      const self = this;

      // Set the selected meal ID and recipe key to the values of the clicked recipe or item.
      self.selectedMealId = mealPlanId;
      self.selectedRecipeId = recipeKey;

      // Call the toggleModalState function to open the modal.
      self.toggleModalState();
    },
    onSaveMeal() {
      const self = this;
      apiUtilService
        .handleSaveMealPlan({
          meal_plan: self.mealPlan,
          user_id: self.$store.state.user.user_id,
        })
        .then((res) => {
          if (res.success) {
            self.serverResponse.message = res.message;
            self.serverResponse.success = res.success;

            // set updated meal plan to store
            self.$store.commit("setUserMealPlan", res.data);
          }
        })
        .catch((err) => {
          self.serverResponse.message = err.response.data.message;
          self.serverResponse.success = false;
        });
    },
    toggleModalState() {
      const self = this;
      self.isShowModal = !self.isShowModal;
    },
  },
};
</script>
