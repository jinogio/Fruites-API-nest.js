<template>
  <h1>Fruits</h1>
  <FruitsFilterForm :families="families" @on-submit="onFilterSubmit" />
  <FruitsList :list="list" @on-favorite-toggle="onFavoriteToggle" />
  <Pagination
    :allow-back="page > 1"
    :allow-next="hasNextPage"
    @on-next="changePage(page + 1)"
    @on-previous="changePage(page - 1)"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FruitsList from "@/components/FruitsList.vue";
import Pagination from "@/components/Pagination.vue";
import FruitsFilterForm from "@/components/FruitsFilterForm.vue";
import {
  fetchFruits,
  fetchFamilies,
  addToFavorite,
  removeFromFavorite,
} from "@/services/fruitsApi";
import { Fruit } from "@/types";

export default defineComponent({
  name: "FruitsListView",
  components: {
    FruitsList,
    Pagination,
    FruitsFilterForm,
  },
  data() {
    return {
      page: 1,
      size: 15,
      list: [] as Fruit[],
      families: [] as string[],
      hasNextPage: false,
      filter: {},
    };
  },
  methods: {
    async loadPage() {
      this.list = await fetchFruits(this.page, this.size, this.filter);
      this.hasNextPage = this.list.length === this.size;
    },
    changePage(page: number) {
      this.page = page;
      this.loadPage();
    },
    onFilterSubmit(filter: any) {
      this.filter = filter;
      this.loadPage();
    },
    async onFavoriteToggle({ id, value }: any) {
      const fruit = this.list.find((x: Fruit) => x.id === id);
      if (fruit) {
        if (value) {
          await addToFavorite(id);
        } else {
          await removeFromFavorite(id);
        }

        fruit.favorite = value;
      }
    },
    async loadFamilies() {
      this.families = await fetchFamilies();
    },
  },
  mounted() {
    this.loadPage();
    this.loadFamilies();
  },
});
</script>
