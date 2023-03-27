<template>
  <nav aria-label="...">
    <ul class="pagination">
      <li class="page-item" :class="allowBack ? '' : 'disabled'">
        <span role="button" class="page-link" @click="$emit('onPrevious')"
          >Previous</span
        >
      </li>
      <li class="page-item" :class="allowNext ? '' : 'disabled'">
        <span role="button" class="page-link" @click="$emit('onNext')"
          >Next</span
        >
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Pagination",
  emits: ["onNext", "onPrevious"],
  props: {
    allowBack: Boolean,
    allowNext: Boolean,
  },
});
</script>

<style scoped></style>
