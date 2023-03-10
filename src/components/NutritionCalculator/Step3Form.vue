<template>
  <div class="py-8">
    <h1 class="text-neutral-800 text-[24px] font-bold my-12">
      Personal Details
    </h1>
    <!-- Personal details form -->
    <div>
      <form>
        <div class="grid grid-cols-2 gap-6">
          <!-- Daily calorie intake -->
          <div class="col-span-1 flex flex-col">
            <label for="calories" class="text-neutral-800 font-medium text-base"
              >Daily Caloric Intake</label
            >
            <input
              type="number"
              v-model="formValues.nutritionDetails.intakeCalories"
              class="p-4 box-shadow rounded-full border-[1px] text-base border-neutral-300 my-2 outline-primary-color"
              placeholder="Calories"
              @change="onChangeFormValues()"
            />
          </div>
          <!-- Protien-->
          <div class="col-span-1 flex flex-col">
            <label for="protien" class="text-neutral-800 font-medium text-base"
              >Protein (g/per KG or LB of BW)</label
            >
            <input
              type="number"
              step="0.1"
              v-model="formValues.nutritionDetails.protien"
              class="p-4 box-shadow rounded-full border-[1px] text-base border-neutral-300 my-2 outline-primary-color"
              placeholder="0.7"
              @change="onChangeFormValues()"
            />
            <label for="range" class="text-neutral-600 font-normal text-sm"
              >Range should be 0.7 to 3</label
            >
          </div>
          <!-- Fat field -->
          <div class="col-span-1 flex flex-col">
            <label for="fat" class="text-neutral-800 font-medium text-base"
              >Fat (g/per KG or LB of BW)</label
            >
            <input
              type="number"
              step="0.1"
              v-model="formValues.nutritionDetails.fat"
              class="p-4 box-shadow rounded-full border-[1px] text-base border-neutral-300 my-2 outline-primary-color"
              placeholder="5"
              @change="onChangeFormValues()"
            />
            <label for="range" class="text-neutral-600 font-normal text-sm"
              >Range should be 0.7 to 2.2</label
            >
          </div>
          <!-- Carbohyderate field -->
          <div class="col-span-1 flex flex-col">
            <label
              for="Carbohyderate"
              class="text-neutral-800 font-medium text-base"
              >Carbohydrates (g/per KG or LB of BW)</label
            >
            <input
              type="text"
              v-model="formValues.nutritionDetails.carbohyderate"
              class="p-4 box-shadow rounded-full border-[1px] text-base border-neutral-300 my-2 outline-primary-color"
              placeholder="5"
              @change="onChangeFormValues()"
            />
          </div>
          <div class="col-span-1">
            <select
              @change="onChangeFormValues()"
              v-model="formValues.nutritionDetails.unit"
              class="p-4 w-2/4 box-shadow rounded-full border-[1px] text-base text-neutral-600 border-neutral-300 my-2 outline-primary-color"
            >
              <option>kg</option>
              <option>lbs</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "step-3-form",
  props: {
    formValues: Object,
  },
  methods: {
    onChangeFormValues() {
      const self = this;
      self.$emit("onUpdate", 3);
    },
  },
};
</script>

<style scoped>
/* input field box shadow */
.box-shadow {
  box-shadow: 0px 2px 6px rgba(19, 18, 66, 0.07);
}
</style>
