<template>
  <!-- This div needed for scroll bar to be far right -->
  <div class="">
    <!-- Optional: shared header, breadcrumbs, etc. -->
    <RouterView />
    <!-- your blog subviews go here -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { usePostStore } from '@/stores/PostStore';

const postStore = usePostStore();

async function handlePopState(event: PopStateEvent) {
  const state = event.state;
  if (state?.pagination) {
    await postStore.getPosts({
      limit: state.pagination.pageSize,
      offset: (state.pagination.page - 1) * state.pagination.pageSize,
      search: state.pagination.filters?.q,
      tag: state.pagination.filters?.tag
    });
  }
}

onMounted(() => {
  window.addEventListener('popstate', handlePopState);
});

onUnmounted(() => {
  window.removeEventListener('popstate', handlePopState);
});
</script>
