<script setup>
// import PostCard from './PostCard.vue';
defineProps(['posts']);
import TagBadge from './TagBadge.vue';
</script>

<template>
  <TransitionGroup
    tag="div"
    class="grid grid-cols-1 gap-10 lg:grid-cols-2 xl:grid-cols-3"
    enter-active-class="transition-opacity duration-300 ease-out"
    leave-active-class="transition-opacity duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-for="post in posts"
      :key="post.id"
      class="group card flex flex-col rounded-lg shadow-2xl sm:shrink-0 sm:grow sm:basis-0"
    >
      <img class="h-[30vh] rounded-t-lg object-cover" :src="post.image" alt="" />
      <div class="card-body justify-between px-6 pb-1 pt-6 text-base-content">
        <h5 class="card-title">{{ post.title }}</h5>
        <div class="flex-grow">
          <div class="h-[100px] text-ellipsis">
            <p class="line-clamp-4 font-sans leading-relaxed">{{ post.description }}</p>
          </div>
        </div>
        <span
          class="mt-5 flex flex-wrap-reverse items-end justify-end gap-x-1 gap-y-2.5 overflow-hidden"
        >
          <TagBadge v-for="tag in post.tags" :key="tag" :tag="tag" />
        </span>
      </div>
      <div class="divider my-0"></div>
      <div class="flex items-center justify-between gap-x-1 overflow-hidden px-6 py-3 text-center">
        <router-link
          :to="{
            name: 'blog-post-details',
            params: { slug: post.slug }
          }"
          class="btn btn-primary duration-150 group-hover:scale-105"
          >Read More
        </router-link>
        <p class="ps-2 text-end text-base-content">
          Published: {{ new Date(post.created_at).toLocaleString() }}
        </p>
      </div>
    </div>
  </TransitionGroup>
</template>
