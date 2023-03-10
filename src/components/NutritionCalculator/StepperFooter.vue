<template>
  <div class="my-8 flex justify-between">
    <button
      class="border-2 border-primary-color rounded-full py-3 px-8 text-primary-color disabled:border-neutral-400 disabled:text-neutral-400"
      @click="handleGotoPrevStep()"
      :disabled="stepNo === 1"
    >
      Previous step
    </button>
    <button
      class="bg-primary-color rounded-full py-3 px-8 text-neutral-100 box-shadow disabled:bg-neutral-400"
      @click="handleGotoNextStep()"
      :disabled="!isStepFormValid"
      v-if="stepNo < totalSteps"
    >
      {{
        stepNo === 1 || stepNo === 2 || stepNo === 3
          ? "Next Step"
          : "Calculate Macros"
      }}
    </button>
    <button
      class="bg-primary rounded-full py-3 px-8 text-neutral-100 box-shadow disabled:bg-neutral-400"
      @click="onClickGenerateButton()"
      :disabled="!isStepFormValid"
      v-else
    >
      Generate Meal Plans +
    </button>
  </div>
</template>
<script>
export default {
  name: "stepper_footer",
  props: {
    stepNo: Number,
    totalSteps: Number,
    isStepFormValid: Boolean,
  },

  methods: {
    handleGotoNextStep() {
      const self = this;
      self.$emit("onClickNextStepBtn");
    },
    handleGotoPrevStep() {
      const self = this;
      self.$emit("onClickPrevStepBtn");
    },
    onClickGenerateButton() {
      const self = this;
      self.$emit("onSubmit");
    },
  },
};
</script>
<style scoped>
.box-shadow {
  box-shadow: 0px 3px 12px rgba(74, 58, 255, 0.18);
}
</style>
