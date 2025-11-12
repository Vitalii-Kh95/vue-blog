<script setup>
import TagBadge from '@/components/blog/TagBadge.vue';
import Header from '@/components/blog/BlogHeader.vue';
import NotFound from '@/components/NotFound.vue';
import { usePostStore } from '@/stores/PostStore';
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

import { defineAsyncComponent, computed } from 'vue';

const route = useRoute();
const breakpoints = useBreakpoints(breakpointsTailwind);
const postStore = usePostStore();
postStore.getPosts({ limit: 5 });

const postsForAsideBlock = computed(() => {
  const filteredPosts = postStore.posts.filter((post) => post.slug !== route.params.slug);

  if (filteredPosts.length < 1) {
    return null;
  }
  if (filteredPosts.length > 4) {
    // If there are more than 4 posts, discard the extra post
    return filteredPosts.slice(0, 4);
  }

  return filteredPosts;
});

const AsideBlock = computed(() =>
  postsForAsideBlock.value
    ? defineAsyncComponent(() => import('@/components/blog/AsideBlock.vue'))
    : null
);

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.slug !== from.params.slug) {
    await postStore.getPost(to.params.slug);
    document.title = postStore.post.title || 'Blog Example';
  }
});
</script>
<template>
  <div v-if="postStore.post" class="container mx-auto flex flex-col items-center px-6">
    <!-- no v-once as it can be changed via aside block -->
    <Header data-test="blog-post-details-header" :title="postStore.post.title" />
    <div class="mt-6 grid flex-1 grid-cols-3 gap-14 2xl:gap-20">
      <div :class="AsideBlock ? 'col-span-full xl:col-span-2' : 'col-span-full xl:mx-40'">
        <img class="rounded" :src="postStore.post.image" alt="" />

        <div class="divider"></div>

        <p class="font-serif text-xl">{{ postStore.post.content }}</p>
        <div class="mt-5 flex flex-wrap-reverse justify-end gap-1">
          <span data-test="post-tags" v-for="tag in postStore.post.tags" :key="tag.name">
            <TagBadge data-test="post-tag-link" :tag="tag" />
          </span>
        </div>
        <div class="divider mb-3"></div>

        <div class="flex items-center justify-between pb-4">
          <router-link
            data-test="go-back-link"
            class="btn btn-primary rounded-xl"
            :to="{ name: 'blog' }"
            >Go Back</router-link
          >
          <span class="ps-2" data-test="post-published-date"
            >Published: {{ new Date(postStore.post.created_at).toLocaleDateString() }}</span
          >
        </div>
      </div>
      <component
        :is="AsideBlock"
        v-if="!breakpoints.smallerOrEqual('xl').value && AsideBlock"
        :posts="postsForAsideBlock"
      />
    </div>
  </div>
  <NotFound data-test="not-found" v-else return-route-name="blog" />
</template>
