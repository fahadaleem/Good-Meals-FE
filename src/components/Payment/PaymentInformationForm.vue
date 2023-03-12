<template>
  <div class="max-w-[800px] h-screen mx-auto flex justify-center items-center">
    <div
      class="w-full card-shadow border-[1px] border-neutral-300 p-8 rounded-[34px]"
    >
      <div class="grid grid-cols-2 gap-8">
        <div class="col-span-1 py-16 px-4 bg-primary rounded-lg">
          <div class="flex justify-center items-center text-white">
            <div>
              <h1 class="text-3xl font-bold">
                Upgrade now to get your personalised meal plans!
              </h1>
              <ul class="list-disc mx-8 my-12">
                <li class="text-lg my-2">Choose Your Daily Meals</li>
                <li class="text-lg my-2">Customised Daily Recipes</li>
                <li class="text-lg my-2">Track Your Daily Food Intake</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Payment form -->
        <div class="col-span-1">
          <form>
            <div class="flex flex-col gap-2">
              <div class="flex flex-col">
                <label
                  for="email"
                  class="text-neutral-800 font-medium text-base"
                  >Email</label
                >
                <input
                  type="text"
                  v-model="email"
                  disabled="true"
                  placeholder="John@gmail.com"
                  class="p-4 box-shadow rounded-full border-[1px] text-base border-neutral-300 my-2 outline-primary-color disabled:text-neutral-500"
                />
              </div>

              <div>
                <label
                  for="card-information"
                  class="text-neutral-800 font-medium text-base"
                  >Card Information</label
                >
                <div class="flex flex-col">
                  <div
                    class="flex-1 relative p-4 border-[1px] border-neutral-300 rounded-full box-shadow"
                    id="card-number"
                  ></div>
                  <div class="flex gap-x-2">
                    <div
                      class="flex-1 p-4 w-full box-shadow rounded-full border-[1px] text-base border-neutral-300 my-2"
                      id="card-expiry"
                    ></div>
                    <div
                      class="flex-1 flex-1 p-4 w-full box-shadow rounded-full border-[1px] text-base border-neutral-300 my-2"
                      id="card-cvc"
                    ></div>
                  </div>
                </div>
              </div>
              <div class="flex flex-col">
                <label
                  for="name-on-card"
                  class="text-neutral-800 font-medium text-base"
                  >Name on card</label
                >
                <input
                  type="text"
                  v-model="nameOnCard"
                  placeholder="John Doe"
                  class="p-4 box-shadow rounded-full border-[1px] text-base border-neutral-300 my-2 outline-primary-color"
                />
              </div>
              <div class="">
                <button
                  type="submit"
                  :disabled="!isCardValid"
                  class="border-2 border-pop-pink bg-pop-pink text-neutral-100 rounded-full w-full py-4 text-base disabled:bg-neutral-500 disabled:border-neutral-500"
                >
                  Click to pay $20
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Payment Form",
  data() {
    return {
      email: "",
      nameOnCard: "",
      stripe: null,
    };
  },
  created() {
    const self = this;
    // set user email
    self.email = self.$store.state.user.email;
  },
  mounted() {
    const self = this;
    // Set your publishable key: remember to change this to your live publishable key in production
    // See your keys here: https://dashboard.stripe.com/apikeys
    self.stripe = Stripe(
      "pk_test_51I9Be8GOXbatF6xOvpLtGTkJ2l9gVXXR0jjSMCS8dRKZ2lQ09fHjuf8gOZjYaHGsRgSo8LCxaoJLWXiu2bsnpbRB00aEn9C693"
    );
    var elements = self.stripe.elements();

    var cardNumber = elements.create("cardNumber");
    var cardExpiry = elements.create("cardExpiry");
    var cardCvc = elements.create("cardCvc");

    cardNumber.mount("#card-number");
    cardExpiry.mount("#card-expiry");
    cardCvc.mount("#card-cvc");
  },
  computed: {},
  methods: {
    submitForm() {},
  },
};
</script>
