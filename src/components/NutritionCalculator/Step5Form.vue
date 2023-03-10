<template>
  <div>
    <div>
      <p class="text-lg font-bold">Here is the split of your meals:</p>
      <div class="my-4">
        <!-- Splitted Meals -->
        <div v-for="meal in formValues.numberOfMeals" :key="meal">
          <p class="text-lg">
            <span class="font-bold">Meal {{ meal }}:</span>
            {{
              `${getSplittedCalories} calories: PROTIEN: ${getSplittedMacrosInGram.protien}g, FAT:${getSplittedMacrosInGram.fat}g, CARBS:${getSplittedMacrosInGram.carbohyderate}g`
            }}
          </p>
        </div>

        <!-- Number of meals  -->
        <div class="my-6">
          <div class="flex items-center gap-x-8">
            <p class="text-lg font-bold">Number of Meals:</p>
            <input
              type="number"
              v-model="formValues.numberOfMeals"
              disabled="true"
              class="p-4 box-shadow rounded-full border-[1px] text-base text-neutral-600 border-neutral-300 my-2 outline-primary-color"
              placeholder="5"
            />
          </div>
          <div class="flex items-center gap-x-8">
            <p class="text-lg font-bold">Protien Ratio:</p>
            <input
              type="number"
              v-model="macros.protienPercentage"
              disabled="true"
              class="p-4 box-shadow rounded-full border-[1px] text-base text-neutral-600 border-neutral-300 my-2 outline-primary-color"
              placeholder="5"
            />
          </div>
          <div class="flex items-center gap-x-8">
            <p class="text-lg font-bold">Fat Ratio:</p>
            <input
              type="number"
              v-model="macros.fatPercentage"
              disabled="true"
              class="p-4 box-shadow rounded-full border-[1px] text-base text-neutral-600 border-neutral-300 my-2 outline-primary-color"
              placeholder="5"
            />
          </div>
          <div class="flex items-center gap-x-8">
            <p class="text-lg font-bold">Carbs Ratio:</p>
            <input
              type="number"
              v-model="macros.carbohyderatePercentage"
              disabled="true"
              class="p-4 box-shadow rounded-full border-[1px] text-base text-neutral-600 border-neutral-300 my-2 outline-primary-color"
              placeholder="5"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { nutritionCalculatorUtilService } from "../../utils/nutritionCalculatorUtilService";
export default {
  name: "step-5-form",
  props: {
    macros: Object,
    formValues: Object,
  },
  data() {},
  computed: {
    getSplittedCalories() {
      const self = this;
      return (
        self.formValues.nutritionDetails.intakeCalories /
        self.formValues.numberOfMeals
      ).toFixed(2);
    },
    getSplittedMacrosInGram() {
      const self = this;
      const { protien, fat, carbohyderate } =
        nutritionCalculatorUtilService.getProtienFatAndCarbohyderate(
          self.macros.protienPercentage,
          self.macros.fatPercentage,
          self.macros.carbohyderatePercentage,
          self.formValues.nutritionDetails.intakeCalories
        );
      return {
        protien: self.limitDecimals(protien / self.formValues.numberOfMeals),
        fat: self.limitDecimals(fat / self.formValues.numberOfMeals),
        carbohyderate: self.limitDecimals(
          carbohyderate / self.formValues.numberOfMeals
        ),
      };
    },
  },

  methods: {
    initialize() {},
    limitDecimals(number, numberOfDecimals = 2) {
      return number.toFixed(numberOfDecimals);
    },
  },
};
</script>
