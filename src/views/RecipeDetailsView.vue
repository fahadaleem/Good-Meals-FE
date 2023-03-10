<template>
  <div class="recipe-details">
    <recipe-details></recipe-details>
  </div>
</template>
<script>
import RecipeDetails from "../components/Recipes/RecipeDetails.vue";
export default {
  name: "RecipeDetailsView",
  components: {
    recipeDetails: RecipeDetails,
  },
};
</script>
<style></style>
