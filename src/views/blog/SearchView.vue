<script setup>
import { ref, computed } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { usePostStore } from '@/stores/PostStore';
import PostCards from '@/components/blog/PostCards.vue';
import Pagination from '@/components/blog/pagination/ThePagination.vue';
import IconSearch from '@/assets/icons/IconSearch.min.svg?raw';

const postStore = usePostStore();

const route = useRoute();
const router = useRouter();

const headerTitle = computed(() => {
  let resultString;
  if (!route.query.q) resultString = 'Search';
  else if (route.query.q && postStore.posts.length === 0)
    resultString = `Nothing matched "${route.query.q}"`;
  else {
    resultString = route.query.q;
  }
  if (resultString.length > 29) return resultString.slice(0, 28) + '...';
  return resultString;
});

const searchInputText = ref('');

function submit() {
  if (!searchInputText.value.trim()) return;
  router.push({ name: 'blog-search', query: { q: searchInputText.value } });
}

onBeforeRouteUpdate(async (to, from) => {
  if (to.query.q !== from.query.q) {
    if (to.query.q && to.query.q !== '') {
      await postStore.getPosts({ search: to.query.q });
      document.title = `Search "${to.query.q}"`;
    } else {
      document.title = 'Blog Search';
      postStore.$reset();
    }
    searchInputText.value = '';
  }
});
</script>

<template>
  <div class="container mx-auto flex flex-col items-center">
    <!-- Header -->
    <div class="h-40 w-full bg-gradient-to-r from-base-100 via-base-200 to-base-100 md:h-60">
      <div
        class="m-auto flex h-full flex-col items-center justify-start gap-y-5 pt-12 text-center md:w-full md:max-w-none md:gap-y-8 md:pt-16"
      >
        <form
          data-test="post-search-form"
          @submit.prevent="submit"
          role="search"
          class="join rounded-full border-base-content/20 has-[input:focus]:border"
        >
          <label class="join-item relative flex items-center sm:max-w-none">
            <input
              data-test="post-search-searchbox"
              v-model="searchInputText"
              type="search"
              name="q"
              placeholder="Search"
              class="input w-56 rounded-s-full border border-base-content/20 pe-8 ps-4 text-lg md:input-lg focus:outline-none focus:ring-0 sm:w-64 md:w-80 md:pe-12 lg:w-96"
            />
            <div
              v-html="IconSearch"
              class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-50 *:top-1/2 *:h-4 *:w-4 md:*:h-5 md:*:w-5"
            />
          </label>

          <button
            data-test="post-search-submit-button"
            type="submit"
            class="btn btn-info join-item btn-sm min-h-12 rounded-r-full sm:btn-md md:btn-lg"
            :disabled="searchInputText.trim() === ''"
          >
            Search
          </button>
        </form>

        <div class="whitespace-nowrap">
          <h1
            class="text-2xl font-bold text-base-content/90 md:text-4xl"
            data-test="post-search-heading"
          >
            {{ headerTitle }}
          </h1>
        </div>
      </div>
    </div>
    <!-- /Header -->
    <div class="container mx-auto flex flex-col items-center px-6">
      <PostCards class="my-5" :posts="postStore.posts" />
      <Pagination class="mb-4 mt-1" />
    </div>
  </div>
</template>
