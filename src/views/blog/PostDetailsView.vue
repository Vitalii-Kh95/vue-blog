<script setup>
import TagBadge from '@/components/blog/TagBadge.vue';
import Header from '@/components/blog/BlogHeader.vue';
import NotFound from '@/components/NotFound.vue';
import { usePostStore } from '@/stores/PostStore';
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core';
import { onBeforeRouteUpdate } from 'vue-router';
import { defineAsyncComponent } from 'vue';

// import { useRoute } from 'vue-router';
// import { watch, onMounted } from 'vue';

// const route = useRoute();
const breakpoints = useBreakpoints(breakpointsTailwind);
const postStore = usePostStore();

const AsideBlock = defineAsyncComponent(() => import('@/components/blog/AsideBlock.vue'));

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.slug !== from.params.slug) {
    await postStore.getPost(to.params.slug);
    document.title = postStore.post.title || 'Blog Example';
  }
});
</script>
<template>
  <!-- div for scroll bar to be far right. I probably need to fix it -->
  <div v-if="postStore.post">
    <div class="container mx-auto flex flex-col items-center px-6">
      <!-- no v-once as it can be changed via aside block -->
      <Header data-test="blog-post-details-heading" :title="postStore.post.title" />
      <div class="mt-6 grid flex-1 grid-cols-3 gap-14 2xl:gap-20">
        <div class="col-span-full xl:col-span-2">
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
              >Published: {{ new Date(postStore.post.created_at).toLocaleString() }}</span
            >
          </div>
        </div>
        <keep-alive>
          <AsideBlock v-if="!breakpoints.smallerOrEqual('xl').value" />
        </keep-alive>
      </div>
    </div>
  </div>
  <NotFound data-test="not-found" v-else return-route-name="blog" />
</template>
