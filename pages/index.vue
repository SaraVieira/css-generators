<template>
  <div class="mb-12">
    <div class="w-[1280px] max-w-[90%] mx-auto my-8">
      <Logo />
      <span class="font-bold text-lg ,mb-4">Filter by category:</span>
      <div class="flex gap-x-4 flex-wrap">
        <div class="form-control" v-for="cat in categories">
          <label class="label cursor-pointer">
            <input
              type="checkbox"
              class="checkbox checkbox"
              :id="cat"
              :value="cat"
              v-model="checkedCats"
            />
            <span class="ml-2 label-text capitalize">{{ cat }}</span>
          </label>
        </div>
      </div>
    </div>
    <div
      class="w-[1280px] max-w-[90%] grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto"
    >
      <Generator :generators="filtered" />
    </div>
  </div>
</template>

<script setup>
import { CATEGORIES } from "../utils/generators";

const checkedCats = ref([]);
const filtered = ref([]);
const categories = Object.keys(CATEGORIES);
const data = await Promise.all(
  generators.map((g) => ({
    url: g.url,
    ...useLazyFetch(`/api/og?url=${g.url}`).data.value,
    categories: g.categories,
  }))
);
nextTick();
filtered.value = data;

watch(checkedCats, async (cats) => {
  if (!cats.length) {
    filtered.value = data;
  } else {
    filtered.value = data.filter((cat) =>
      cats.some((a) => cat.categories.includes(a))
    );
  }
});
</script>
