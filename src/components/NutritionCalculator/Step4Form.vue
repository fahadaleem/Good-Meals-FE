<template>
  <div>
    <p class="text-lg font-bold">
      Hello, {{ formValues.username }}, based on your information, you should
      eat approximately
      {{ formValues.nutritionDetails.intakeCalories }} calories per day
    </p>

    <div class="my-6">
      <p class="text-lg font-bold">
        Your Macro Split as a percentage of your daily calories is:
      </p>
      <ul class="list-disc ml-4 text-lg font-normal">
        <li>Protien: {{ macros.protienPercentage }}% ({{ protienInGram }}g)</li>
        <li>Fat: {{ macros.fatPercentage }}% ({{ fatInGram }}g)</li>
        <li>
          Carbs: {{ macros.carbohyderatePercentage }}% ({{
            carbohyderateInGram
          }}g)
        </li>
      </ul>
    </div>
    <div class="my-6 flex gap-x-2 items-center">
      <p class="text-lg font-bold my-6">
        How many meals would you like to eat per day?
      </p>
      <input
        type="number"
        v-model="formValues.numberOfMeals"
        class="p-4 box-shadow rounded-full border-[1px] text-base border-neutral-300 my-2 outline-primary-color"
        placeholder="5"
      />
    </div>

    <!-- splitted rations -->
    <div class="my-6">
      <p class="text-lg font-bold">
        Each meal would be approximately:
        {{ caloriesPerMeal }} calories with a micro split of:
      </p>
      <ul class="list-disc ml-4 text-lg font-normal">
        <li>
          Protien: {{ splittedProtien }}g ({{ macros.protienPercentage }}%)
        </li>
        <li>Fat: {{ splittedFat }}g ({{ macros.fatPercentage }}%)</li>
        <li>
          Carbs: {{ splittedCarbohyderate }}g ({{
            macros.carbohyderatePercentage
          }}%)
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { nutritionCalculatorUtilService } from "../../utils/nutritionCalculatorUtilService";
export default {
  name: "step-4-form",
  props: {
    formValues: Object,
    macros: Object,
  },
  data() {
    return {
      protienInGram: 0,
      fatInGram: 0,
      carbohyderateInGram: 0,
      numberOfMeals: 1,
    };
  },
  created() {
    const self = this;
    self.initialize();
  },
  computed: {
    caloriesPerMeal() {
      const self = this;
      return (
        self.formValues.nutritionDetails.intakeCalories / self.numberOfMeals
      ).toFixed(2);
    },
    splittedProtien() {
      const self = this;
      return (self.calculateProtienInGram() / self.numberOfMeals).toFixed(2);
    },
    splittedFat() {
      const self = this;
      return (self.calculateFatInGram() / self.numberOfMeals).toFixed(2);
    },
    splittedCarbohyderate() {
      const self = this;
      return (self.calculateCarbohyderateInGram() / self.numberOfMeals).toFixed(
        2
      );
    },
  },
  methods: {
    initialize() {
      const self = this;
      self.protienInGram = self.calculateProtienInGram();
      self.fatInGram = self.calculateFatInGram();
      self.carbohyderateInGram = self.calculateCarbohyderateInGram();
    },
    calculateProtienInGram() {
      const self = this;
      return (
        (self.macros.protienPercentage / 100) *
        (self.formValues.nutritionDetails.intakeCalories / 4)
      ).toFixed(2);
    },
    calculateFatInGram() {
      const self = this;
      return (
        (self.macros.fatPercentage / 100) *
        (self.formValues.nutritionDetails.intakeCalories / 9)
      ).toFixed(2);
    },
    calculateCarbohyderateInGram() {
      const self = this;
      return (
        (self.macros.carbohyderatePercentage / 100) *
        (self.formValues.nutritionDetails.intakeCalories / 4)
      ).toFixed(2);
    },
  },
};
</script>
