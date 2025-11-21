<script setup lang="ts">
import { useRouter } from 'vue-router';
import IconSearch from '@/assets/icons/IconSearch.min.svg?raw';
const router = useRouter();
function submit(form) {
  return router.push({
    name: 'blog-search',
    query: { q: form.target.elements.q.value }
  });
}
</script>
<template>
  <form @submit.prevent="(form) => submit(form)" role="search" class="join rounded-full">
    <input
      type="search"
      name="q"
      class="input join-item input-bordered grow text-base-content focus:outline-2 focus:outline-transparent dark:bg-inherit"
      placeholder="Search"
    />
    <button v-html="IconSearch" class="btn btn-info join-item *:h-5 *:w-5 *:opacity-50" />
  </form>
</template>
