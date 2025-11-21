<script setup lang="ts">
import { usePostStore } from '@/stores/PostStore';
import PostCards from '@/components/blog/PostCards.vue';
import Pagination from '@/components/blog/pagination/ThePagination.vue';
import Header from '@/components/blog/BlogHeader.vue';
const postStore = usePostStore();
</script>

<template>
  <div class="container mx-auto flex flex-col items-center px-6">
    <!-- <h1 class="mb-2 mt-5 text-center text-4xl font-bold">Recent blog posts</h1> -->
    <Header v-once title="Recent blog posts" data-test="blog-header" />
    <PostCards class="my-5" :posts="postStore.posts" />
    <Pagination class="mb-4 mt-1" />
  </div>
</template>
