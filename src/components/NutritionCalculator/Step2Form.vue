<template>
  <div class="py-8">
    <h1 class="text-neutral-800 text-[24px] font-bold my-12">
      Personal Details
    </h1>
    <!-- Personal details form -->
    <div>
      <form>
        <div class="grid grid-cols-2 gap-6">
          <!-- Gender field -->
          <div class="col-span-1 flex flex-col">
            <label for="username" class="text-neutral-800 font-medium text-base"
              >Sex</label
            >

            <!-- Gender radio box -->
            <div class="flex my-2 ml-2 gap-4">
              <div class="flex items-center mr-4 mb-4">
                <input
                  id="male"
                  type="radio"
                  name="gender"
                  class="hidden"
                  value="Male"
                  v-model="formValues.gender"
                  @change="onChangeFormValues()"
                />
                <label
                  for="male"
                  class="flex items-center cursor-pointer text-neutral-600 text-base"
                >
                  <span
                    class="w-5 h-5 bg-neutral-400 inline-block mr-2 rounded-full border border-grey flex-no-shrink"
                  ></span>
                  Male</label
                >
              </div>
              <div class="flex items-center mr-4 mb-4">
                <input
                  id="female"
                  type="radio"
                  name="gender"
                  class="hidden"
                  value="Female"
                  v-model="formValues.gender"
                  @change="onChangeFormValues()"
                />
                <label
                  for="female"
                  class="flex items-center cursor-pointer text-neutral-600 text-base"
                >
                  <span
                    class="w-5 h-5 bg-neutral-400 inline-block mr-2 rounded-full border border-grey flex-no-shrink"
                  ></span>
                  Female</label
                >
              </div>
            </div>
          </div>
          <!-- Activity level field -->
          <div class="col-span-1 flex flex-col">
            <label for="age" class="text-neutral-800 font-medium text-base"
              >Activity Level</label
            >
            <select
              v-model="formValues.activityLevel"
              @change="onChangeFormValues()"
              class="p-4 box-shadow rounded-full border-[1px] text-base border-neutral-300 my-2 outline-primary-color"
            >
              <option value="Sedentary">Sedentary</option>
              <option value="Lightly Active">Lightly Active</option>
              <option value="Moderately Active">Moderately Active</option>
              <option value="Very Active">Very Active</option>
              <option value="Extremely Active">Extremely Active</option>
            </select>
          </div>
          <!-- Goal field -->
          <div class="col-span-1 flex flex-col">
            <label for="height" class="text-neutral-800 font-medium text-base"
              >Goal</label
            >
            <div class="ml-2 mt-2">
              <div class="flex items-center mr-4 mb-4">
                <input
                  id="lose-weight"
                  type="radio"
                  name="goal"
                  class="hidden"
                  value="Lose Weight"
                  v-model="formValues.goal"
                  @change="onChangeFormValues()"
                />
                <label
                  for="lose-weight"
                  class="flex items-center cursor-pointer text-neutral-600 text-base"
                >
                  <span
                    class="w-5 h-5 bg-neutral-400 inline-block mr-2 rounded-full border border-grey flex-no-shrink"
                  ></span>
                  Lose Weight</label
                >
              </div>
              <div class="flex items-center mr-4 mb-4">
                <input
                  id="maintain-weight"
                  type="radio"
                  name="goal"
                  class="hidden"
                  value="Maintain Weight"
                  @change="onChangeFormValues()"
                  v-model="formValues.goal"
                />
                <label
                  for="maintain-weight"
                  class="flex items-center cursor-pointer text-neutral-600 text-base"
                >
                  <span
                    class="w-5 h-5 bg-neutral-400 inline-block mr-2 rounded-full border border-grey flex-no-shrink"
                  ></span>
                  Maintain Weight</label
                >
              </div>
              <div class="flex items-center mr-4 mb-4">
                <input
                  id="gain-weight"
                  type="radio"
                  name="goal"
                  class="hidden"
                  value="Gain Weight"
                  v-model="formValues.goal"
                  @change="onChangeFormValues()"
                />
                <label
                  for="gain-weight"
                  class="flex items-center cursor-pointer font-light text-neutral-600 text-base"
                >
                  <span
                    class="w-5 h-5 bg-neutral-400 inline-block mr-2 rounded-full border border-grey flex-no-shrink"
                  ></span>
                  Gain Weight</label
                >
              </div>
            </div>
          </div>
          <!-- How fast field -->
          <div class="col-span-1 flex flex-col">
            <label for="weight" class="text-neutral-800 font-medium text-base"
              >How Fast</label
            >
            <select
              v-model="formValues.howFast"
              @change="onChangeFormValues()"
              class="p-4 box-shadow rounded-full border-[1px] text-base border-neutral-300 my-2 outline-primary-color"
            >
              <option value="Slow">Slow</option>
              <option value="Moderate">Moderate</option>
              <option value="Fast">Fast</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "step-2-form",
  props: {
    formValues: Object,
  },
  methods: {
    onChangeFormValues() {
      const self = this;
      self.$emit("onUpdate", 2);
    },
  },
};
</script>

<style scoped>
input[type="radio"] + label span {
  transition: background 0.2s, transform 0.2s;
}

input[type="radio"] + label span:hover,
input[type="radio"] + label:hover span {
  transform: scale(1.2);
}

input[type="radio"]:checked + label span {
  @apply bg-primary-color;
  box-shadow: 0px 0px 0px 2px white inset;
}

input[type="radio"]:checked + label {
  @apply text-primary-color;
}

/* input field box shadow */
.box-shadow {
  box-shadow: 0px 2px 6px rgba(19, 18, 66, 0.07);
}
</style>
