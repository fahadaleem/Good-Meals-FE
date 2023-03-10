<template>
  <div class="login">
    <login></login>
  </div>
</template>
<script>
import Login from "../components/Auth/Login.vue";
export default {
  name: "LoginView",
  components: {
    login: Login,
  },
};
</script>
<style></style>
