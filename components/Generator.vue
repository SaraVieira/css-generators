<script setup>
const props = defineProps({
  generator: Object,
});
const { data: rsp } = useFetch(`/api/og?url=${props.generator.url}`);
</script>

<template>
  <ClientOnly>
    <figure>
      <img :src="rsp.image?.url" :alt="rsp.title" />
    </figure>
    <a
      target="_blank"
      rel="noopener noreferrer"
      :href="generator.url"
      class="card-body"
    >
      <h2 class="card-title">{{ rsp.title }}</h2>
      <div class="flex gap-2">
        <div
          v-for="(cat, i) in generator.categories"
          :class="{ badge: true, 'badge-accent': i === 0 }"
        >
          {{ cat }}
        </div>
      </div>
      <p class="line-clamp-3 max-h-[74px]">{{ rsp.description }}</p>

      <div class="card-actions justify-end absolute right-8 bottom-8">
        <a
          :href="generator.url"
          v-if="generator.url"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-primary"
          >Open</a
        >
      </div>
    </a>
  </ClientOnly>
</template>
