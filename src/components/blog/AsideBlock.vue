<script setup lang="ts">
import type { Post } from '@/types';

interface Props {
  posts: Array<Post>;
}

const { posts } = defineProps<Props>();

// import { usePostStore } from '@/stores/PostStore';
// import { useRoute } from 'vue-router';
// import { computed } from 'vue';

// const route = useRoute();

// const postStore = usePostStore();
// postStore.getPosts({ limit: 5 });

// const posts = computed(() => {
//   const filteredPosts = postStore.posts.filter((post) => post.slug !== route.params.slug);

//   if (filteredPosts.length > 4) {
//     // If there are more than 4 posts, discard the extra post
//     return filteredPosts.slice(0, 4);
//   }

//   return filteredPosts;
// });

// if not posts.length = 4 getposts limit 1 offset 3
</script>
<template>
  <div class="card h-fit overflow-hidden border bg-base-100 shadow-xl" data-test="aside-block">
    <div class="bg-neutral/90 p-5 text-neutral-content">
      <h1 class="text-center text-3xl font-bold" data-test="aside-block-heading">Last posts</h1>
    </div>
    <div v-for="(post, index) in posts" :key="post.id" data-test="aside-block-post-card">
      <div class="card-body">
        <router-link
          data-test="aside-block-post-card-title-link"
          :to="{ name: 'blog-post-details', params: { slug: post.slug } }"
          class="card-title hover:underline"
          >{{ post.title }}</router-link
        >
      </div>
      <figure class="">
        <img
          class="max-h-[200px] w-full object-cover"
          data-test="aside-block-post-card-preview-image"
          :src="post.image"
          alt="Shoes"
        />
      </figure>
      <div class="card-body">
        <div
          data-test="aside-block-post-card-description"
          class="line-clamp-4 h-[100px] text-ellipsis"
        >
          {{ post.description }}
        </div>
        <div class="card-actions">
          <router-link
            :to="{ name: 'blog-post-details', params: { slug: post.slug } }"
            class="link link-secondary"
            data-test="aside-block-post-card-read-more-link"
            >Read More</router-link
          >
        </div>
        <div v-if="index !== posts.length - 1" class="divider my-0"></div>
      </div>
    </div>
  </div>
</template>
