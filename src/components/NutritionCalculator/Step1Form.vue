<template>
  <div class="py-8">
    <h1 class="text-neutral-800 text-[24px] font-bold my-12">
      Personal Details
    </h1>
    <!-- Personal details form -->
    <div>
      <form>
        <div class="grid grid-cols-2 gap-6">
          <!-- Name field -->
          <div class="col-span-1 flex flex-col">
            <label
              for="username "
              class="text-neutral-800 font-medium text-base"
              >Name</label
            >
            <input
              type="text"
              v-model="formValues.username"
              @change="onChangeFormValues()"
              class="p-4 box-shadow rounded-full border-[1px] text-base border-neutral-300 my-2 outline-primary-color"
              placeholder="John Doe"
            />
          </div>

          <!-- Age field -->
          <div class="col-span-1 flex flex-col">
            <label for="age " class="text-neutral-800 font-medium text-base"
              >Age</label
            >
            <input
              type="text"
              v-model="formValues.age"
              @change="onChangeFormValues()"
              class="p-4 box-shadow rounded-full border-[1px] text-base border-neutral-300 my-2 outline-primary-color"
              placeholder="20"
            />
          </div>
          <!-- Height field -->
          <div class="col-span-1 flex flex-col">
            <label for="username" class="text-neutral-800 font-medium text-base"
              >Height</label
            >
            <div class="flex gap-4">
              <input
                type="text"
                v-model="formValues.height.value"
                @change="onChangeFormValues()"
                class="p-4 w-3/4 box-shadow rounded-full border-[1px] text-base border-neutral-300 my-2 outline-primary-color"
                placeholder="5"
              />
              <select
                v-model="formValues.height.unit"
                class="p-4 box-shadow rounded-full border-[1px] text-base text-neutral-600 border-neutral-300 my-2 outline-primary-color"
              >
                <option value="cm">cm</option>
                <option value="m">m</option>
                <option value="in">in</option>
                <option value="ft">ft</option>
              </select>
            </div>
          </div>
          <!-- Weight field -->
          <div class="col-span-1 flex flex-col">
            <label for="username" class="text-neutral-800 font-medium text-base"
              >Weight</label
            >
            <div class="flex gap-4">
              <input
                type="text"
                v-model="formValues.weight.value"
                @change="onChangeFormValues()"
                class="p-4 w-3/4 box-shadow rounded-full border-[1px] text-base border-neutral-300 my-2 outline-primary-color"
                placeholder="5"
              />
              <select
                v-model="formValues.weight.unit"
                class="p-4 box-shadow rounded-full border-[1px] text-base text-neutral-600 border-neutral-300 my-2 outline-primary-color"
              >
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "step-1-form",
  props: {
    formValues: Object,
  },
  methods: {
    onChangeFormValues() {
      const self = this;
      self.$emit("onUpdate", 1);
    },
  },
};
</script>
