<script setup>
import { usePostStore } from '@/stores/PostStore';
import PostCards from '@/components/blog/PostCards.vue';
import Pagination from '@/components/blog/pagination/ThePagination.vue';
import Header from '@/components/blog/BlogHeader.vue';
const postStore = usePostStore();
</script>

<template>
  <!-- div for scroll bar to be far right. I probably need to fix it -->
  <div class="">
    <div class="container mx-auto flex flex-col items-center px-6">
      <!-- <h1 class="mb-2 mt-5 text-center text-4xl font-bold">Recent blog posts</h1> -->
      <Header v-once title="Recent blog posts" />
      <PostCards class="my-5" :posts="postStore.posts" />
      <Pagination class="mb-4 mt-1" />
    </div>
  </div>
</template>
