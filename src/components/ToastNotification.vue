<template>
  <Transition name="toast">
    <div
      :class="[
        typeClasses,
        'flex p-3 rounded-md items-center',
        positionClasses,
      ]"
      v-show="visible"
    >
      <!-- <div class="flex-shrink-0">
        <svg class="w-6 h-6" :class="[iconClasses]">
          <use :xlink:href="icon"></use>
        </svg>
      </div> -->
      <div class="ml-2">
        <div class="font-medium text-base">{{ message }}</div>
      </div>
      <div class="ml-auto pl-2 flex items-center">
        <button class="focus:outline-none" @click="hide">
          <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M10 8.586L6.707 5.293a1 1 0 1 0-1.414 1.414L8.586 10l-3.293 3.293a1 1 0 1 0 1.414 1.414L10 11.414l3.293 3.293a1 1 0 0 0 1.414-1.414L11.414 10l3.293-3.293a1 1 0 0 0-1.414-1.414L10 8.586z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>
<script>
export default {
  name: "toast-notification",
  props: {
    type: {
      type: String,
      default: "success",
    },
    message: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 3000,
    },
    direction: {
      type: String,
      default: "bottom-right",
      validator: function (value) {
        return (
          ["top-right", "top-left", "bottom-right", "bottom-left"].indexOf(
            value
          ) !== -1
        );
      },
    },
  },
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    hide() {
      const self = this;
      self.visible = false;
    },
  },
  mounted() {
    const self = this;
    setTimeout(() => {
      self.visible = false;
    }, self.duration);
  },
  computed: {
    typeClasses() {
      switch (this.type) {
        case "success":
          return "bg-green-400 text-white";
        case "warning":
          return "bg-yellow-400 text-white";
        case "error":
          return "bg-red-400 text-white";
        default:
          return "bg-blue-400 text-white";
      }
    },
    iconClasses() {
      switch (this.type) {
        case "success":
          return "text-green-200";
        case "warning":
          return "text-yellow-200";
        case "error":
          return "text-red-200";
        default:
          return "text-blue-200";
      }
    },
    positionClasses() {
      switch (this.direction) {
        case "top-right":
          return "fixed top-0 right-0 mt-8 mr-8";
        case "top-left":
          return "fixed top-0 left-0 mt-8 ml-8";
        case "bottom-right":
          return "fixed bottom-0 right-0 mb-8 mr-8";
        case "bottom-left":
          return "fixed bottom-0 left-0 mb-8 ml-8";
        default:
          return "";
      }
    },
  },
};
</script>
<style>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s ease-out;
}

.toast-enter,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
