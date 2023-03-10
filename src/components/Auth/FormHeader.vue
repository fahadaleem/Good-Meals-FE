<template>
  <div class="my-10">
    <h1 class="text-2xl text-center font-normal">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: "c-form-header",
  props: {
    title: String,
  },
};
</script>
