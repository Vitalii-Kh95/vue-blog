<template>
  <div v-once class="container m-24 mx-auto max-w-2xl p-0 text-center font-serif text-[#333]">
    <h1 class="text-5xl text-error">404</h1>
    <p class="mx-0 my-5 text-xl">Sorry, the page you are looking for does not exist.</p>
    <router-link
      class="font-bold text-secondary no-underline hover:underline"
      :to="{ name: returnRouteName || 'home' }"
      >Go back to the homepage</router-link
    >
  </div>
</template>

<script setup lang="ts">
interface Props {
  returnRouteName?: string;
}
const { returnRouteName } = defineProps<Props>();
</script>
