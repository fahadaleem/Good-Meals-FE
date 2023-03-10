<script>
import NutritionCalculator from "../components/NutritionCalculator.vue";
export default {
  name: "HomeView",
  components: {
    nutritionCalculator: NutritionCalculator,
  },
};
</script>

<template>
  <main>
    <nutrition-calculator></nutrition-calculator>
  </main>
</template>
