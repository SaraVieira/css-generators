<template>
  <div class="mb-12">
    <div class="w-[1280px] max-w-[90%] mx-auto my-8">
      <Logo />
      <span class="font-bold text-lg mb-4">Filter by category:</span>
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
      <div
        class="card hover:scale-105 hover:-rotate-1 hover:z-10 transition sm:w-96 w-full bg-base-100 shadow-xl hover:shadow-2xl image-full h-72 relative"
        v-if="data.length"
        v-for="generator in data"
      >
        <Generator :key="generator.url" :generator="generator" />
      </div>
    </div>
  </div>
</template>

<script setup>
const data = useState("data", () => []);
const checkedCats = useState("cats", () => []);
const categories = Object.keys(CATEGORIES);
const g = computed(() =>shuffle(generators) )

data.value = g.value.map((g) => ({
  url: g.url,
  categories: g.categories,
}));

watch(checkedCats, async (cats) => {
  if (!cats.length) {
    data.value = g.value;
  } else {
    data.value = g.value.filter((cat) =>
      cats.some((a) => cat.categories.includes(a))
    );
  }
});
</script>
