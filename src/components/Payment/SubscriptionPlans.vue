<template>
  <div class="container mx-auto flex justify-center items-center h-screen">
    <div class="w-3/4 flex gap-x-6">
      <template v-for="(plan, key) in plans" :key="key">
        <div class="shadow border-2 py-20 flex-1 rounded-lg p-8">
          <h1 class="font-bold text-2xl">Good Meals {{ plan.frequency }}</h1>
          <h2 class="my-4 text-neutral-700 font-normal">
            <span class="font-bold text-4xl text-neutral-800">{{
              plan.price
            }}</span>
            USD/{{ plan.frequency }}
          </h2>
          <h3 class="font-bold text-lg">What's Included</h3>
          <!-- Features -->

          <div
            class="flex flex-col gap-y-4 my-4"
            v-for="(feature, index) in plan.features"
            :key="index"
          >
            <!-- List item -->
            <div class="flex items-center gap-2">
              <span class="bg-pop-pink rounded-full p-2"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="white"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </span>
              <span class="font-medium text-lg">{{ feature }}</span>
            </div>
          </div>
          <button
            type="button"
            class="bg-pop-pink rounded-full py-4 px-4 text-neutral-100 w-full"
          >
            Get Started
          </button>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: "subscription-plans",
  data() {
    return {
      plans: [
        {
          type: "monthly_subscriptions",
          price: "$20",
          frequency: "Monthly",
          features: [
            "Choose your daily meals",
            "Customised daily recipes",
            "Choose from over 1500 + recipes",
            "Track your daily food intake",
          ],
          plan_id: "", // add stripe price id here
        },
        {
          type: "yearly_subscriptions",
          price: "$200",
          frequency: "Yearly",
          features: [
            "Choose your daily meals",
            "Customised daily recipes",
            "Choose from over 1500 + recipes",
            "Track your daily food intake",
          ],
          plan_id: "", // add stripe price id here
        },
      ],
    };
  },
};
</script>
