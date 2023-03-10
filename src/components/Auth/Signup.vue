<template>
  <div class="c-signup max-w-[732px] mx-auto px-4 md:p-0">
    <!-- Signup/Login tabs start-->
    <login-signup-tabs></login-signup-tabs>
    <!-- Signup/Login tabs end -->

    <!-- Signup header start-->
    <form-header title="Sign up"></form-header>
    <!-- Signup header end -->

    <!-- Social media signup buttons start -->
    <social-media-btns page="Sign up"></social-media-btns>
    <!-- Social media signup buttons start -->

    <!-- OR DIVIDER START -->
    <div class="my-6">
      <p
        class="flex items-center justify-center gap-x-8 text-center before:content-[''] before:p-[1px] before:w-[215px] before:block before:bg-neutral-400 after:content-[''] after:p-[1px] after:w-[215px] after:block after:bg-neutral-400"
      >
        OR
      </p>
    </div>
    <!-- OR DIVIDER END-->
    <!-- Form start -->
    <div class="my-4 w-full md:w-9/12 mx-auto">
      <form @submit.prevent="handleSubmit" class="grid grid-cols-2 gap-6">
        <div class="col-span-2 md:col-span-1 flex flex-col">
          <label for="first_name" class="text-neutral-800 font-medium text-base"
            >First Name</label
          >
          <input
            type="text"
            placeholder="John"
            v-model="signupFormValues.firstName"
            class="p-4 box-shadow rounded-full border-[1px] text-base border-neutral-300 my-2 outline-primary-color"
            @change="onChangeInputField"
          />
          <label
            for="first_name_error"
            v-if="!!errors.firstName"
            class="text-red-400"
            >{{ errors.firstName }}</label
          >
        </div>
        <div class="col-span-2 md:col-span-1 flex flex-col">
          <label for="last_name" class="text-neutral-800 font-medium text-base"
            >Last Name</label
          >
          <input
            type="text"
            placeholder="Doe"
            @change="onChangeInputField"
            v-model="signupFormValues.lastName"
            class="p-4 box-shadow rounded-full border-[1px] text-base border-neutral-300 my-2 outline-primary-color"
          />
          <label
            for="first_last_error"
            v-if="!!errors.lastName"
            class="text-red-400"
            >{{ errors.lastName }}</label
          >
        </div>
        <div class="col-span-2 flex flex-col">
          <label for="email " class="text-neutral-800 font-medium text-base"
            >Email</label
          >
          <input
            type="text"
            @change="onChangeInputField"
            v-model="signupFormValues.email"
            class="p-4 box-shadow rounded-full border-[1px] text-base border-neutral-300 my-2 outline-primary-color"
            placeholder="faleem396@gmail.com"
          />
          <label for="email_error" v-if="!!errors.email" class="text-red-400">{{
            errors.email
          }}</label>
        </div>
        <div class="col-span-2 flex flex-col">
          <label for="password" class="text-neutral-800 font-medium text-base"
            >Password</label
          >
          <!-- helper text -->
          <label for="password helper text" class="text-neutral-700 text-sm"
            >Use 8 or more characters with a mix of letters, numbers &
            symbols</label
          >
          <input
            type="password"
            @change="onChangeInputField"
            placeholder="Enter your password"
            v-model="signupFormValues.password"
            class="p-4 box-shadow rounded-full border-[1px] text-base border-neutral-300 my-2 outline-primary-color"
          />
          <label
            for="password_error"
            v-if="!!errors.password"
            class="text-red-400"
            >{{ errors.password }}</label
          >
        </div>
        <div class="col-span-2 flex flex-col">
          <label
            for="confirm_password"
            class="text-neutral-800 font-medium text-base"
            >Confirm Password</label
          >
          <!-- helper text -->
          <label for="password-helper-text" class="text-neutral-700 text-sm"
            >Use 8 or more characters with a mix of letters, numbers &
            symbols</label
          >
          <input
            type="password"
            @change="onChangeInputField"
            v-model="signupFormValues.confirmPassword"
            class="p-4 box-shadow rounded-full border-[1px] text-base border-neutral-300 my-2 outline-primary-color"
            placeholder="Enter your password"
          />
          <label
            for="confirm_password_error"
            v-if="!!errors.confirmPassword"
            class="text-red-400"
            >{{ errors.confirmPassword }}</label
          >
        </div>
        <div class="col-span-2 flex">
          <input
            type="checkbox"
            class="md:w-4 md:h-4 h-6 w-6 mt-1"
            id="link-checkbox"
            @change="onChangeInputField"
            v-model="signupFormValues.termsAndConditionAccepted"
          />
          <label
            for="link-checkbox"
            class="ml-2 md:text-base text-sm text-dark-black-800"
            >By creating an account, I agree to our
            <a href="#" class="underline">Terms of use</a>
            and <a href="#" class="underline">Privacy Policy</a> .</label
          >
        </div>
        <div class="col-span-2 flex">
          <input
            type="checkbox"
            class="w-4 h-4 mt-1"
            id="sms-alert-checkbox"
            @change="onChangeInputField"
            v-model="signupFormValues.smsNotificationAllowed"
          />
          <label
            for="sms-alert-checkbox"
            class="w-full ml-2 md:text-base text-sm text-dark-black-800"
            >By creating an account, I am also consenting to receive SMS
            messages and emails, including product new feature updates, events,
            and marketing promotions.</label
          >
        </div>
        <div class="col-span-2">
          <button
            type="submit"
            :disabled="!signupFormValues.termsAndConditionAccepted"
            class="border-2 border-pop-pink bg-pop-pink text-neutral-100 rounded-full w-full py-4 text-base disabled:bg-neutral-500 disabled:border-neutral-500"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
    <!-- Form End -->
    <toast-notification
      v-if="!!errors.serverError"
      :message="errors.serverError"
      type="error"
    ></toast-notification>
  </div>
</template>
<script>
import { appUtilService } from "../../utils/appUtilsService";
import { apiUtilService } from "../../utils/apiUtilService";

// components
import LoginSignupTabs from "./LoginSignupTabs.vue";
import FormHeader from "./FormHeader.vue";
import SocialMediaBtns from "./SocialMediaBtns.vue";
import ToastNotification from "../ToastNotification.vue";

export default {
  name: "c-signup",
  components: {
    loginSignupTabs: LoginSignupTabs,
    formHeader: FormHeader,
    socialMediaBtns: SocialMediaBtns,
    toastNotification: ToastNotification,
  },
  data() {
    return {
      errors: {},
      signupFormValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        termsAndConditionAccepted: "",
        smsNotificationAllowed: "",
      },
    };
  },
  methods: {
    onChangeInputField() {
      const self = this;
    },
    handleSubmit(e) {
      const self = this;
      e.preventDefault();
      self.errors = appUtilService.validateForm(
        self.signupFormValues,
        "signup"
      );
      if (Object.keys(self.errors).length) {
        return;
      }

      apiUtilService
        .handleRegisterUser({
          first_name: self.signupFormValues.firstName,
          last_name: self.signupFormValues.lastName,
          email: self.signupFormValues.email,
          password: self.signupFormValues.password,
          sms_notification_allowed:
            self.signupFormValues.smsNotificationAllowed || false,
        })
        .then((res) => {
          // login the user
          if (res.success) {
            apiUtilService
              .handleLoginUser({
                email: self.signupFormValues.email,
                password: self.signupFormValues.password,
              })
              .then((logginUser) => {
                self.$store.commit("setUser", logginUser.data);
                console.log(!logginUser.data.nutrition_details);
                // if nutrition details is null, redirect to nutrition calculator page
                if (!logginUser.data.nutrition_details) {
                  self.$router.push("/nutrition-calculator");
                }
              });
          }
        })
        .catch((err) => {
          self.errors.serverError =
            err.response.data.message || "Internal server error.";
        });
    },
  },
};
</script>
