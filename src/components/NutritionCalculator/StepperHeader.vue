<template>
  <!---stepper-->
  <div
    class="flex justify-between items-center gap-2 py-4 border-b-2 border-b-neutral-400"
  >
    <!-- Step number -->
    <div
      id="step-1 "
      class="w-8 h-8 rounded-full flex justify-center items-center bg-primary-color text-neutral-100"
    >
      1
    </div>
    <!-- Progress -->
    <div
      class="h-2 rounded rounded w-56 bg-neutral-300 duration-1000"
      :class="{
        'bg-primary ': stepNo > 1,
      }"
    ></div>
    <!-- Step number -->
    <div
      id="step-2"
      class="w-8 h-8 rounded-full flex justify-center items-center"
      :class="{
        'bg-primary-color text-neutral-100': stepNo >= 2,
        'bg-neutral-300': stepNo < 2,
      }"
    >
      2
    </div>
    <!-- Progress -->
    <div
      class="h-2 rounded w-56 bg-neutral-300"
      :class="{
        'bg-primary ': stepNo > 2,
      }"
    ></div>
    <!-- Step number -->
    <div
      id="step-3"
      class="w-8 h-8 rounded-full flex justify-center items-center"
      :class="{
        'bg-primary-color text-neutral-100': stepNo >= 3,
        'bg-neutral-300 text-neutral-600': stepNo < 3,
      }"
    >
      3
    </div>
  </div>
</template>
<script setup>
const props = defineProps(["stepNo"]);
</script>
