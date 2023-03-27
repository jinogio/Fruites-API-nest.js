<template>
  <tr>
    <td>{{ item.name }}</td>
    <td>{{ item.family }}</td>
    <td>{{ item.order }}</td>
    <td>{{ item.genus }}</td>
    <td>{{ nutritions }}</td>
    <td v-show="allowFavorite">
      <button
        v-show="!item.favorite"
        type="button"
        class="btn btn-sm btn-outline-success"
        @click="$emit('onFavoriteToggle', true)"
      >
        Favorite
      </button>
      <button
        v-show="item.favorite"
        type="button"
        class="btn btn-sm btn-outline-danger"
        @click="$emit('onFavoriteToggle', false)"
      >
        Unfavorite
      </button>
    </td>
  </tr>
</template>

<script lang="ts">
import { Fruit } from "@/types";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "FruitsListRow",
  emits: ["onFavoriteToggle"],
  props: {
    item: {
      type: Object as PropType<Fruit>,
      required: true,
    },
    allowFavorite: Boolean,
  },
  computed: {
    nutritions(): string {
      return Object.entries(this.item.nutritions)
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ");
    },
  },
});
</script>

<style scoped></style>
