<script setup>
// import { watch } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { usePostStore } from '@/stores/PostStore';
import Header from '@/components/blog/BlogHeader.vue';
import PostCards from '@/components/blog/PostCards.vue';
import Pagination from '@/components/blog/pagination/ThePagination.vue';

const route = useRoute();
const postStore = usePostStore();

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.slug !== from.params.slug) {
    await postStore.getPosts({ tag: to.params.slug });
    document.title = `#${to.params.slug}`;
  }
});
</script>

<template>
  <div class="">
    <div class="container mx-auto flex w-full flex-col items-center">
      <Header class="md:py-5" :title="`#${route.params.slug}`" data-test="tag-header" />
      <div v-if="postStore.posts.length > 0" class="flex flex-col items-center px-6">
        <PostCards class="my-5" :posts="postStore.posts" />
        <Pagination class="mb-4 mt-1" />
      </div>
      <h1 v-else class="mx-auto pt-10 text-4xl text-error" data-test="tag-not-found">No results</h1>
    </div>
  </div>
</template>
