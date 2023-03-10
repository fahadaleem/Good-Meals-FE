<template>
  <div class="max-w-[670px] mx-auto flex justify-center items-center">
    <div class="flex-1">
      <h1 class="text-[34px] text-center font-bold">
        <!-- totalSteps + 1 means loading screen -->
        {{ stepNo === totalSteps + 1 ? "Hold Tight" : "Nutrition Calculator" }}
      </h1>
      <!-- Multistep form -->
      <div class="my-12">
        <div
          class="w-full card-shadow border-[1px] border-neutral-300 p-8 rounded-[34px]"
        >
          <!---stepper-->
          <stepper-header :step-no="stepNo" v-if="stepNo <= 3"></stepper-header>
          <step1-form
            v-if="stepNo === 1"
            :form-values="formValues"
            @onUpdate="onValidateStepForms"
          ></step1-form>
          <step2-form
            v-else-if="stepNo === 2"
            :form-values="formValues"
            @onUpdate="onValidateStepForms"
          ></step2-form>
          <step3-form
            v-else-if="stepNo === 3"
            :form-values="formValues"
            @onUpdate="onValidateStepForms"
          ></step3-form>
          <step4-form
            :macros="macros"
            v-else-if="stepNo === 4"
            :form-values="formValues"
            @onUpdate="onValidateStepForms"
          ></step4-form>
          <step5-form
            :macros="macros"
            v-else-if="stepNo === 5"
            :form-values="formValues"
            @onUpdate="onValidateStepForms"
          ></step5-form>
          <loading-screen v-else></loading-screen>
        </div>
        <stepper-footer
          :step-no="stepNo"
          :total-steps="totalSteps"
          :is-step-form-valid="isFormValid"
          @onClickNextStepBtn="gotoNextStep"
          @onClickPrevStepBtn="gotoPrevStep"
          @onSubmit="handleGenerateMealPlan"
        ></stepper-footer>
      </div>
    </div>
  </div>
</template>
<script>
import { appUtilService } from "../utils/appUtilsService";
import { apiUtilService } from "../utils/apiUtilService";
import { nutritionCalculatorUtilService } from "../utils/nutritionCalculatorUtilService";

// lodash
import lodashCloneDeep from "lodash/cloneDeep";
import Step1Form from "./NutritionCalculator/Step1Form.vue";
import Step2Form from "./NutritionCalculator/Step2Form.vue";
import Step3Form from "./NutritionCalculator/Step3Form.vue";
import Step4Form from "./NutritionCalculator/Step4Form.vue";
import Step5Form from "./NutritionCalculator/Step5Form.vue";
import StepperHeader from "./NutritionCalculator/StepperHeader.vue";
import StepperFooter from "./NutritionCalculator/StepperFooter.vue";
import LoadingScreen from "./NutritionCalculator/LoadingScreen.vue";

export default {
  name: "nutrition_calculator",
  components: {
    step1Form: Step1Form,
    step2Form: Step2Form,
    step3Form: Step3Form,
    step4Form: Step4Form,
    step5Form: Step5Form,
    stepperHeader: StepperHeader,
    stepperFooter: StepperFooter,
    loadingScreen: LoadingScreen,
  },
  data() {
    const self = this;
    return {
      stepNo: 1,
      totalSteps: 5,
      macros: {},
      isLoading: false,
      nutritionCalories: {
        fatCalories: 0,
        protienCalories: 0,
      },
      formValues: {
        username: "",
        age: "",
        height: {
          value: "",
          unit: "cm",
        },
        weight: {
          value: "",
          unit: "kg",
        },
        gender: "",
        goal: "",
        activityLevel: "",
        howFast: "",
        nutritionDetails: {
          intakeCalories: "2400",
          protien: "",
          fat: "",
          carbohyderate: "",
          unit: "kg",
        },
        numberOfMeals: 2,
      },
      stepFormConfigs: [
        {
          stepFormNo: 1,
          isValid: false,
        },
        {
          stepFormNo: 2,
          isValid: false,
        },
        {
          stepFormNo: 3,
          isValid: false,
        },
        {
          stepFormNo: 4,
          isValid: true, // no validation on last step
        },
        {
          stepFormNo: 5,
          isValid: true, // no validation on last step
        },
      ],
    };
  },
  created() {
    const self = this;
    self.initialize();
  },
  methods: {
    initialize() {
      const self = this;
      self.formValues.username = self.$store.getters.userFullName;
    },
    gotoNextStep() {
      const self = this;

      // If the current step is not the final step, increment the step number
      self.stepNo++;

      // Check if the user has completed step 2
      if (self.stepNo === 3) {
        // If the user has completed step 2, calculate the intake calories
        self.calculateIntakeCalories();
      } else if (self.stepNo === 4) {
        // If the user has completed step 3, handle the calculation of macros
        self.handleCalculateMacros();
      }
    },
    handleGenerateMealPlan() {
      // save users data
      const self = this;
      self.handleSubmitNutritionDetails().then((res) => {
        if (res.status) {
          self.$router.push("/payment");
        }
      });
    },
    gotoPrevStep() {
      const self = this;
      if (self.stepNo > 1) {
        self.stepNo -= 1;
      }
    },
    calculateIntakeCalories() {
      const self = this;
      self.formValues.nutritionDetails.intakeCalories =
        nutritionCalculatorUtilService.calculateIntakeCalories(self.formValues);
    },
    onValidateStepForms(stepNo) {
      const self = this;
      const nutritionCalculatorForm = lodashCloneDeep(self.stepFormConfigs);
      const stepForm = nutritionCalculatorForm.find(
        (form) => form.stepFormNo === stepNo
      );

      if (stepNo === 1) {
        const isFormCompleted = appUtilService.checkObjectValues({
          username: self.formValues.username,
          age: self.formValues.age,
          height: self.formValues.height,
          weight: self.formValues.weight,
        });
        stepForm.isValid =
          isFormCompleted &&
          appUtilService.validateHeightWeightAndAge(
            self.formValues.height.value,
            self.formValues.weight.value,
            self.formValues.age
          );
      } else if (stepNo === 2) {
        stepForm.isValid = appUtilService.checkObjectValues({
          gender: self.formValues.gender,
          activityLevel: self.formValues.activityLevel,
          goal: self.formValues.goal,
          howFast: self.formValues.howFast,
        });
      } else if (stepNo === 3) {
        const isFormCompleted = appUtilService.checkObjectValues(
          self.formValues.nutritionDetails
        );

        stepForm.isValid =
          isFormCompleted &&
          appUtilService.validateProtienAndFat(
            self.formValues.nutritionDetails.protien,
            self.formValues.nutritionDetails.fat
          );

        // calculate carbohyderate
        self.calculateCarbohyderate();
      }

      self.stepFormConfigs = nutritionCalculatorForm;
    },
    handleSubmitNutritionDetails() {
      const self = this;
      return new Promise((resolve, reject) => {
        apiUtilService
          .handleAddNutritionDetails({
            user_id: self.$store.state.user.user_id,
            height: self.formValues.height,
            weight: self.formValues.weight,
            nutrition_details: {
              intake_calories: self.formValues.nutritionDetails.intakeCalories,
              proteins: self.formValues.nutritionDetails.protien,
              fats: self.formValues.nutritionDetails.fat,
              carbohydrates: self.formValues.nutritionDetails.carbohyderate,
              unit: self.formValues.nutritionDetails.unit,
            },
            activity_level: self.formValues.activityLevel,
            how_fast: self.formValues.howFast,
            goal: self.formValues.goal,
            gender: self.formValues.gender,
            age: self.formValues.age,
            number_of_meals: self.formValues.numberOfMeals,
          })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    handleCalculateMacros() {
      const self = this;
      const {
        height,
        weight,
        age,
        nutritionDetails: { intakeCalories, protien, fat, carbohyderate },
      } = self.formValues;
      // update user nutrition details

      self.macros.protienPercentage = (
        (self.nutritionCalories.protienCalories /
          self.formValues.nutritionDetails.intakeCalories) *
        100
      ).toFixed(2);
      self.macros.fatPercentage = (
        (self.nutritionCalories.fatCalories / intakeCalories) *
        100
      ).toFixed(2);
      self.macros.carbohyderatePercentage = (
        100 -
        self.macros.protienPercentage -
        self.macros.fatPercentage
      ).toFixed(2);
    },
    calculateCarbohyderate() {
      const self = this;
      let fatCalories, protienCalories;

      const { protien, fat, unit, intakeCalories } =
        self.formValues.nutritionDetails;

      // Weight in kg
      const weight = nutritionCalculatorUtilService.convertWeightIntoKg(
        self.formValues.weight
      );

      // if the fats, and protiens are in lbs, convert it into kg
      if (unit === "lbs") {
        console.log(weight);
        self.nutritionCalories.fatCalories = fat * weight * 4 * 0.453592;
        self.nutritionCalories.protienCalories =
          protien * weight * 9 * 0.453592;
      } else {
        self.nutritionCalories.protienCalories = protien * weight * 4;
        self.nutritionCalories.fatCalories = fat * weight * 4;
      }

      self.formValues.nutritionDetails.carbohyderate = Math.floor(
        intakeCalories -
          self.nutritionCalories.protienCalories -
          self.nutritionCalories.fatCalories
      );
    },
  },
  computed: {
    isFormValid() {
      const self = this;
      return (
        self.stepFormConfigs.find(
          (formConfig) => formConfig.stepFormNo == self.stepNo
        ).isValid || false
      );
    },
  },
};
</script>
