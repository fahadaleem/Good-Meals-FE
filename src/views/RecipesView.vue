<template>
  <div class="recipes">
    <recipes></recipes>
  </div>
</template>
<script>
import Recipes from "../components/Recipes/Recipes.vue";
export default {
  name: "RecipesView",
  components: {
    recipes: Recipes,
  },
};
</script>
<style></style>
