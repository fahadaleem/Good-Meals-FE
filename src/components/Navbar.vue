<template>
  <nav class="container mx-auto">
    <div class="p-4 flex items-center justify-between">
      <router-link
        to="/"
        class="bg-primary rounded-full py-3 px-8 text-neutral-100 inline-block"
      >
        Good Meals
      </router-link>
      <!--  -->
      <div
        class="menu flex items-center gap-x-4"
        v-if="$store.getters.isUserLoggedIn"
      >
        <router-link to="/recipes" class="font-bold"> Recipes </router-link>
        <router-link to="/meal-plan" class="font-bold"> Meal Plan </router-link>
        <router-link
          to="/favourite-recipes"
          class="bg-primary-color rounded-full py-3 px-4 text-neutral-100 inline-block flex items-center gap-x-2"
        >
          <span>Favourites</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </router-link>
        <div class="relative inline-block text-left" ref="accountMenu">
          <div>
            <button
              type="button"
              class="bg-pop-pink rounded-full py-3 px-4 text-neutral-100 inline-flex items-center gap-x-2 inline-flex w-full justify-center"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              @click="isShowAccountMenu = !isShowAccountMenu"
            >
              Account
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>

          <!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  -->
          <div
            class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            :class="{ 'transform opacity-0 scale-95': !isShowAccountMenu }"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1"
          >
            <div class="py-1" role="none">
              <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
              <a
                href="#"
                class="text-gray-700 block px-4 py-2"
                role="menuitem"
                tabindex="-1"
                id="menu-item-0"
                >Account settings</a
              >
              <button
                @click="handleLogout"
                class="text-gray-700 block px-4 py-2"
                role="menuitem"
                tabindex="-1"
                id="menu-item-1"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "navbar",
  data() {
    return {
      isShowAccountMenu: false,
    };
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    handleClickOutside(event) {
      if (
        this.$refs.accountMenu &&
        !this.$refs.accountMenu.contains(event.target)
      ) {
        this.isShowAccountMenu = false;
      }
    },
    handleLogout() {
      const self = this;
      self.$store.commit("handleLogout");
      self.$router.push("/login");
    },
  },
};
</script>
