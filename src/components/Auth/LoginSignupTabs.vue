<template>
  <div class="c-login-signup-tab">
    <!-- Signup/Login tabs start-->
    <div class="flex">
      <router-link to="/signup" class="flex-1">
        <button class="bg-pop-pink text-neutral-100 py-3 w-full rounded-l-lg">
          Sign up
        </button>
      </router-link>
      <router-link to="/login" class="flex-1">
        <button
          class="bg-primary-color text-neutral-100 py-3 w-full rounded-r-lg"
        >
          Login
        </button>
      </router-link>
    </div>
    <!-- Signup/Login tabs end -->
  </div>
</template>
<script>
export default {
  name: "c-login-signup-tab",
};
</script>
