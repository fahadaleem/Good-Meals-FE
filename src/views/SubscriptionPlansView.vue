<template>
  <div class="subcription-plans">
    <subscription-plans></subscription-plans>
  </div>
</template>
<script>
import SubscriptionPlans from "../components/Payment/SubscriptionPlans.vue";
export default {
  name: "SubscriptionPlansView",
  components: {
    subscriptionPlans: SubscriptionPlans,
  },
};
</script>
<style></style>
