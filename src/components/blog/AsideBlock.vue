<script setup>
import { usePostStore } from '@/stores/PostStore';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const postStore = usePostStore();
postStore.getPosts({ limit: 5 });

const posts = computed(() => {
  const filteredPosts = postStore.posts.filter((post) => post.slug !== route.params.slug);

  if (filteredPosts.length > 4) {
    // If there are more than 4 posts, discard the extra post
    return filteredPosts.slice(0, 4);
  }

  return filteredPosts;
});
// if not posts.length = 4 getposts limit 1 offset 3
</script>
<template>
  <div class="card h-fit overflow-hidden border bg-base-100 shadow-xl">
    <div class="bg-neutral/90 p-5 text-neutral-content">
      <h1 class="text-center text-3xl font-bold">Last posts</h1>
    </div>
    <div v-for="(post, index) in posts" :key="post.id">
      <div class="card-body">
        <router-link
          :to="{ name: 'blog-post-details', params: { slug: post.slug } }"
          class="card-title hover:underline"
          >{{ post.title }}</router-link
        >
      </div>
      <figure class="">
        <img class="max-h-[200px] w-full object-cover" :src="post.image" alt="Shoes" />
      </figure>
      <div class="card-body">
        <div class="line-clamp-4 h-[100px] text-ellipsis">{{ post.description }}</div>
        <div class="card-actions">
          <router-link
            :to="{ name: 'blog-post-details', params: { slug: post.slug } }"
            class="link link-secondary"
            >Read More</router-link
          >
        </div>
        <div class="divider my-0" v-if="index !== posts.length - 1"></div>
      </div>
    </div>
  </div>
</template>
