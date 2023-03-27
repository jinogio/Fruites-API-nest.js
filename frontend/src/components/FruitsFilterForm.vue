<template>
  <div class="row my-3">
    <div class="col-md-5 col-sm-12 my-1">
      <input
        type="text"
        class="form-control"
        placeholder="Filter by name"
        aria-label="Filter by name"
        v-model="name"
      />
    </div>
    <div class="col-md-6 col-sm-12 my-1">
      <select class="form-select" v-model="family">
        <option value="" selected>All</option>
        <option v-for="item in families" :value="item" :key="item">
          {{ item }}
        </option>
      </select>
    </div>
    <div class="col-md-1 col-sm-12 my-1">
      <div class="d-grid gap-2 d-md-block">
        <button
          type="button"
          class="btn btn-primary me-md-2"
          @click="() => $emit('onSubmit', { name, family })"
        >
          Filter
        </button>
        <button
          type="button"
          class="btn btn-danger"
          @click="
            () => {
              name = '';
              family = '';
              $emit('onSubmit', {});
            }
          "
        >
          Clear
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "FruitsFilterForm",
  emits: ["onSubmit"],
  props: {
    families: Array as PropType<string[]>,
  },
  data() {
    return {
      name: "",
      family: "",
    };
  },
});
</script>

<style scoped></style>
