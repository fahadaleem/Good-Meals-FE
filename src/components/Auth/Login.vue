<template>
  <div class="c-login max-w-[732px] mx-auto px-4 md:p-0">
    <!-- Signup/Login tabs start-->
    <login-signup-tabs></login-signup-tabs>
    <!-- Signup/Login tabs end -->
    <!-- login header start-->
    <form-header title="Login"></form-header>
    <!-- login header end -->
    <!-- Social media login buttons start -->
    <social-media-btns page="Login"></social-media-btns>
    <!-- Social media login buttons end -->

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
      <form @submit.prevent="handleLogin" class="grid grid-cols-2 gap-6">
        <div class="col-span-2 flex flex-col">
          <label for="email" class="text-neutral-800 font-medium text-base"
            >Email</label
          >
          <input
            type="text"
            placeholder="John@gmail.com"
            v-model="loginFormValues.email"
            class="p-4 box-shadow rounded-full border-[1px] text-base border-neutral-300 my-2 outline-primary-color"
          />
          <label for="email_error" v-if="!!errors.email" class="text-red-400">{{
            errors.email
          }}</label>
        </div>
        <div class="col-span-2 flex flex-col">
          <label for="password" class="text-neutral-800 font-medium text-base"
            >Password</label
          >
          <input
            type="password"
            placeholder="John"
            v-model="loginFormValues.password"
            class="p-4 box-shadow rounded-full border-[1px] text-base border-neutral-300 my-2 outline-primary-color"
          />
          <label
            for="password_error"
            class="text-red-400"
            v-if="!!errors.password"
            >{{ errors.password }}</label
          >
        </div>
        <div class="col-span-2">
          <button
            type="submit"
            :disabled="!loginFormValues.email || !loginFormValues.password"
            class="border-2 border-pop-pink bg-pop-pink text-neutral-100 rounded-full w-full py-4 text-base disabled:bg-neutral-500 disabled:border-neutral-500"
          >
            Login
          </button>
        </div>
      </form>
    </div>
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
  name: "c-login",
  components: {
    loginSignupTabs: LoginSignupTabs,
    formHeader: FormHeader,
    socialMediaBtns: SocialMediaBtns,
    toastNotification: ToastNotification,
  },
  data() {
    return {
      errors: {},
      loginFormValues: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    handleLogin(e) {
      const self = this;
      e.preventDefault();
      self.errors = appUtilService.validateForm(self.loginFormValues, "login");
      if (Object.keys(self.errors).length) {
        return;
      }

      apiUtilService
        .handleLoginUser(self.loginFormValues)
        .then((res) => {
          if (res.success) {
            self.$store.commit("setUser", res.data);

            // if nutrition details is null, redirect to nutrition calculator page
            if (!res.data.nutrition_details) {
              self.$router.push("/nutrition-calculator");
            } else if (!res.data.subscription_details) {
              self.$router.push("/payment");
            } else {
              self.$router.push("/meal-plan");
            }
          }
        })
        .catch((err) => {
          self.errors.serverError =
            err.response.data.message || "Internal Server Error";
        });
    },
  },
};
</script>
