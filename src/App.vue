<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="main">
    <Navbar />
    <RouterView />
    <Footer />
  </div>
</template>

<style>
/* input field box shadow */
.box-shadow {
  box-shadow: 0px 2px 6px rgba(19, 18, 66, 0.07);
}
/* Nutrition form and payment card shadow */
.card-shadow {
  box-shadow: 0px 5px 16px rgba(8, 15, 52, 0.06);
}
</style>
