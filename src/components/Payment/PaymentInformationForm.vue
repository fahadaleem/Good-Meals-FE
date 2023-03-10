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

              <!-- Card Information -->
              <div>
                <label
                  for="card-information"
                  class="text-neutral-800 font-medium text-base"
                  >Card Information</label
                >
                <div class="flex flex-col">
                  <div class="flex-1 relative">
                    <input
                      type="text"
                      v-model="formattedCardNumber"
                      @input="onInputCardInformation($event, 'cardNumber')"
                      maxlength="19"
                      placeholder="Card Number"
                      class="py-4 pl-4 pr-12 w-full box-shadow rounded-full border-[1px] text-base border-neutral-300 my-2 outline-primary-color"
                    />
                    <i
                      class="absolute text-2xl right-[20px] top-[20px]"
                      :class="
                        creditCardType
                          ? 'fa-brands fa-cc-' + creditCardType
                          : 'fa solid fa-credit-card'
                      "
                    ></i>
                  </div>
                  <div class="flex-1 flex gap-x-4">
                    <input
                      type="text"
                      v-model="formattedExpiry"
                      @input="onInputCardInformation($event, 'expiry')"
                      placeholder="MM/YY"
                      maxlength="5"
                      class="p-4 w-full box-shadow rounded-full border-[1px] text-base border-neutral-300 my-2 outline-primary-color"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      v-model="cvv"
                      maxlength="3"
                      @input="onInputCardInformation($event, 'cvv')"
                      class="p-4 w-full box-shadow rounded-full border-[1px] text-base border-neutral-300 my-2 outline-primary-color"
                    />
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
import lodashCloneDeep from "lodash/cloneDeep";
import { paymentUtilService } from "../../utils/paymentUtilService";
export default {
  name: "Payment Form",
  data() {
    return {
      email: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
      nameOnCard: "",
      showCardIcon: false,
      cardType: "",
    };
  },
  created() {
    const self = this;
    // set user email
    self.email = self.$store.state.user.email;
  },
  computed: {
    isCardValid() {
      const self = this;
      return (
        paymentUtilService.validateCardNumber(self.cardNumber) &&
        paymentUtilService.validateCardExpiry(self.expiry) &&
        paymentUtilService.validateCvvValid(self.cvv) &&
        !!self.nameOnCard
      );
    },
    formattedExpiry() {
      const self = this;
      return self.expiry.length === 2 && !this.expiry.includes("/")
        ? (self.expiry += "/")
        : self.expiry;
    },
    formattedCardNumber: {
      get: function () {
        const self = this;
        const cardNumber = lodashCloneDeep(self.cardNumber);
        const formatted = cardNumber
          .replace(/\s/g, "")
          .replace(/(\d{4})/g, "$1 ");
        return formatted.trim();
      },
      set: function (newValue) {
        const self = this;
        self.cardNumber = newValue;
      },
    },
    creditCardType() {
      const self = this;
      const visaRegEx = /^4[0-9]{12}(?:[0-9]{3})?$/;
      const amexRegEx = /^3[47][0-9]{13}$/;
      const discoverRegEx = /^6(?:011|5[0-9]{2})[0-9]{12}$/;
      const mastercardRegEx = /^5[1-5][0-9]{14}$/;

      const cardNumber = self.cardNumber.replace(/[^\d]/g, "");
      if (visaRegEx.test(cardNumber)) {
        self.cardType = "visa";
        return "visa";
      } else if (amexRegEx.test(cardNumber)) {
        self.cardType = "amex";
        return "amex"; // american express
      } else if (discoverRegEx.test(cardNumber)) {
        self.cardType = "discovery";
        return "discover";
      } else if (mastercardRegEx.test(cardNumber)) {
        self.cardType = "mastercard";
        return "mastercard";
      } else {
        self.cardType = "";
        return null; // default card Icon
      }
    },
  },
  methods: {
    submitForm() {
      console.log("Payment process success!");
    },
    inputCardNumber(e) {
      const self = this;
      const numericRegex = /[^\d]/g;
      self.cardNumber = e.target.value.replace(numericRegex, "");
    },
    inputExpiry(e) {
      const self = this;
      const numericRegex = /[^\d]/g;
      self.expiry = e.target.value.replace(numericRegex, "");
    },
    onInputCardInformation(e, field) {
      const self = this;
      const numericRegex = /[^\/\d]/g;
      self[field] = e.target.value.replace(numericRegex, "");
    },
  },
};
</script>
