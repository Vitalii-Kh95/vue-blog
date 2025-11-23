<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import BlogNavigation from './TheNavigationBlog.vue';
import HomeNavigation from './TheNavigationHome.vue';

const route = useRoute();
// const parentRoute = computed(() => route.matched[route.matched.length - 2]);

// const parentRouteName = computed(() => parentRoute.value?.name);
const navigationComponent = computed(() => {
  if (route.matched.some((r) => r.meta.blog)) {
    return BlogNavigation;
  }
  return HomeNavigation;
});
</script>
<template>
  <component :is="navigationComponent" />
</template>
