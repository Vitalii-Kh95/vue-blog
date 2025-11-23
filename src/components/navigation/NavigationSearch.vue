<script setup lang="ts">
import { useRouter } from 'vue-router';
import IconSearch from '@/assets/icons/IconSearch.min.svg?raw';
const router = useRouter();
function submit(event: Event) {
  const formData = new FormData(event.target as HTMLFormElement);
  return router.push({
    name: 'blog-search',
    query: { q: formData.get('q') as string }
  });
}
</script>
<template>
  <form
    role="search"
    class="join rounded-full"
    @submit.prevent="(form) => submit(form)"
  >
    <input
      type="search"
      name="q"
      class="input join-item input-bordered grow text-base-content focus:outline-2 focus:outline-transparent dark:bg-inherit"
      placeholder="Search"
    />
    <button
      class="btn btn-info join-item *:h-5 *:w-5 *:opacity-50"
      v-html="IconSearch"
    />
  </form>
</template>
