<template>
  <!-- Social media signup buttons start -->
  <div class="flex flex-col gap-y-4">
    <div class="flex-1">
      <button
        class="border-2 rounded-full border-neutral-400 w-full md:w-9/12 mx-auto py-4 text-base flex items-center justify-center gap-x-2"
      >
        <img
          src="/social-media-icons/facebook-logo.svg"
          alt="facebook logo"
          class="w-6 h-6"
        />
        {{ page }} with Facebook
      </button>
    </div>
    <div class="flex-1">
      <button
        class="border-2 rounded-full border-neutral-400 w-full md:w-9/12 mx-auto py-4 text-base flex items-center justify-center gap-x-2"
      >
        <img
          src="/social-media-icons/google-logo.svg"
          alt="facebook logo"
          class="w-6 h-6"
        />
        {{ page }} with Google
      </button>
    </div>
  </div>
  <!-- Social media signup buttons start -->
</template>
<script>
export default {
  props: {
    page: String,
  },
};
</script>
