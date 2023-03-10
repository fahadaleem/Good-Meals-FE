<template>
  <div class="meal-plan">
    <meal-plan></meal-plan>
  </div>
</template>
<script>
import MealPlan from "../components/MealPlan/MealPlan.vue";
export default {
  name: "MealPlanView",
  components: {
    mealPlan: MealPlan,
  },
};
</script>
<style></style>
