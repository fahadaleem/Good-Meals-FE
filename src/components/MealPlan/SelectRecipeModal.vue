<template>
  <div class="fixed top-0 left-0 w-full h-full overflow-y-auto bg-neutral-100">
    <!-- Header -->
    <div
      class="flex justify-between items-center p-4 border-b-2 border-neutral-400"
    >
      <button @click="onCloseModal">
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
    <!-- Body -->
    <div>
      <recipes :meal-plan="mealPlan" @onSelectRecipe="onSelectRecipe"></recipes>
    </div>
  </div>
</template>
<script>
import Recipes from "../Recipes/Recipes.vue";
export default {
  name: "SelectRecipeModal",
  props: {
    mealPlan: Object,
  },
  components: {
    recipes: Recipes,
  },
  methods: {
    onCloseModal() {
      const self = this;
      self.$emit("onClickCloseModal");
    },
    onSelectRecipe(recipe) {
      const self = this;
      self.$emit("onSelectRecipe", recipe);
    },
  },
};
</script>
