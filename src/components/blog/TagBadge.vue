<template>
  <router-link
    v-once
    class="badge badge-secondary font-medium"
    :to="{ name: `blog-posts-by-tag`, params: { slug: tag } }"
  >
    #{{ tag }}
  </router-link>
</template>

<script setup lang="ts">
import type { Post } from '@/types';
interface Props {
  tag: Post['tags'][number];
}
const { tag } = defineProps<Props>();
</script>
