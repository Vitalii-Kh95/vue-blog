<script setup>
// In SearchView another specific header is used
defineProps(['title']);
</script>

<template>
  <div class="flex flex-col justify-center bg-gradient-to-r from-base-100 via-base-200 to-base-100">
    <div class="py-8 text-center sm:py-10 lg:py-14">
      <h1 data-test="blog-header-heading" class="text-2xl font-bold sm:text-3xl md:text-4xl">
        {{ title }}
      </h1>
    </div>
  </div>
</template>
