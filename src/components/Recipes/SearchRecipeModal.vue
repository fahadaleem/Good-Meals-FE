<template>
  <div>
    <div>
      <button
        @click="isShowSearchModal = true"
        class="py-3 px-8 rounded-full border-2 border-dark-blue text-dark-blue"
      >
        Search
      </button>
    </div>
    <div
      v-if="isShowSearchModal"
      class="bg-neutral-700 fixed w-full h-full left-0 top-0 z-40 p-10"
    >
      <div>
        <button @click="isShowSearchModal = false">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.8"
            stroke="white"
            class="w-12 h-12"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <!-- Search Textbox -->
      <div class="h-full flex flex-cols justify-center items-center">
        <form @submit.prevent="onSearchRecipes" class="flex-1">
          <div class="md:w-3/4 w-full mx-auto">
            <input
              min="1"
              type="text"
              v-model="searchText"
              placeholder="Search Recipes"
              class="py-3 px-4 box-shadow w-full block mx-auto rounded-full border-[1px] text-base border-neutral-300 my-2 outline-primary-color"
            />
            <label for="helptext" class="text-neutral-400"
              >Type recipe name and press enter</label
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "search-recipe-modal",

  data() {
    return {
      isShowSearchModal: false,
      searchText: "",
    };
  },
  methods: {
    onSearchRecipes() {
      const self = this;
      self.isShowSearchModal = false;
      self.$emit("onSearchRecipes", self.searchText);
    },
  },
};
</script>
