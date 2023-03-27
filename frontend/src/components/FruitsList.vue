<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Family</th>
        <th scope="col">Order</th>
        <th scope="col">Genus</th>
        <th scope="col">Nutritions</th>
        <th v-show="allowFavorite" scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <FruitsListRow
        v-for="item in list"
        :key="item.id"
        :item="item"
        @on-favorite-toggle="
          (value) => $emit('onFavoriteToggle', { id: item.id, value })
        "
        :allowFavorite="allowFavorite"
      />
    </tbody>
  </table>
</template>

<script lang="ts">
import { Fruit } from "@/types";
import { defineComponent, PropType } from "vue";
import FruitsListRow from "@/components/FruitsListRow.vue";

export default defineComponent({
  name: "FruitsList",
  components: {
    FruitsListRow,
  },
  emits: ["onFavoriteToggle"],
  props: {
    list: Array as PropType<Fruit[]>,
    allowFavorite: { type: Boolean, default: true },
  },
});
</script>

<style scoped></style>
