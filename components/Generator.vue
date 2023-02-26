<script setup>
defineProps({
  generators: Object,
});
</script>

<template>
  <div
    class="card hover:scale-105 hover:-rotate-1 hover:z-10 transition sm:w-96 w-full bg-base-100 shadow-xl hover:shadow-2xl image-full h-72 relative"
    v-for="generator in generators"
    target="_blank"
  >
    <figure :href="generator.url" v-if="generator.image?.url">
      <img :src="generator.image?.url" :alt="generator.title" />
    </figure>
    <a :href="generator.url" v-if="generator.url" class="card-body">
      <h2 class="card-title">{{ generator.title }}</h2>
      <div class="flex gap-2">
        <div
          v-for="(cat, i) in generator.categories"
          :class="{ badge: true, 'badge-accent': i === 0 }"
        >
          {{ cat }}
        </div>
      </div>
      <p class="line-clamp-3 max-h-[74px]">{{ generator.description }}</p>

      <div class="card-actions justify-end absolute right-8 bottom-8">
        <a :href="generator.url" target="_blank" class="btn btn-primary"
          >Open</a
        >
      </div>
    </a>
  </div>
</template>
