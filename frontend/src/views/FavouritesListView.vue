<template>
  <h1>Favourite Fruits</h1>
  <div class="row">
    <div class="col text-end">
      <b>Total Nutritions</b>: {{ totalNutritions }}
    </div>
  </div>
  <FruitsList :list="list" :allowFavorite="false" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FruitsList from "@/components/FruitsList.vue";
import { fetchFavorites, fetchFavoritesNutritions } from "@/services/fruitsApi";
import { Fruit } from "@/types";

export default defineComponent({
  name: "FavoritesListView",
  components: {
    FruitsList,
  },
  data() {
    return {
      list: [] as Fruit[],
      nutritions: {} as any,
    };
  },
  methods: {
    async load() {
      const [list, nutritions] = await Promise.all([
        fetchFavorites(),
        fetchFavoritesNutritions(),
      ]);
      this.list = list;
      this.nutritions = nutritions;
    },
  },
  computed: {
    totalNutritions(): string {
      return Object.entries(this.nutritions)
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ");
    },
  },
  mounted() {
    this.load();
  },
});
</script>
