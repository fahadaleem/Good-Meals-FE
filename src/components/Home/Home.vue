<template>
  <div class="c-home h-screen bg-neutral-450">
    <div
      class="h-full container mx-auto flex flex-col justify-center items-center"
    >
      <div class="grid grid-cols-2 gap-12 items-center">
        <div class="md:col-span-1 col-span-2">
          <img
            src="/landing_page_image_placeholder.png"
            class="w-full h-full"
            alt="placeholder"
          />
        </div>
        <div class="md:col-span-1 col-span-2">
          <!-- Create account heading -->
          <h1 class="text-3xl font-bold">
            Create your account today and get started for free!
          </h1>
          <p class="font-normal text-lg my-8">
            Good Meals revolutionises meal planning with personalised nutrition
            calculations based on your unique characteristics. With daily food
            tracking and tailored recipe recommendations, it simplifies meal
            planning to fit your needs and goals!
          </p>

          <!-- Login/Signup button group -->
          <div class="flex gap-4" v-if="!$store.getters.isUserLoggedIn">
            <router-link to="/signup">
              <button
                class="bg-primary-color py-3 px-12 rounded-full text-white"
              >
                Sign Up
              </button>
            </router-link>
            <router-link to="/login">
              <button
                class="border-2 border-primary-color py-3 px-12 rounded-full text-primary-color"
              >
                Login
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "c-home",
};
</script>
