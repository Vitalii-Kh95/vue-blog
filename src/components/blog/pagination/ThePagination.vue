<script setup>
import PaginationButton from './paginationButton.vue';
import { useRoute } from 'vue-router';
import { usePostStore } from '@/stores/PostStore';
const route = useRoute();
// it's an appendix from times I had projects view,
// but I decided to keep it that way
const postStore = usePostStore();
</script>

<template>
  <nav v-show="postStore.pageCount > 1" aria-label="Paginate me" data-test="pagination-navigation">
    <ul class="flex gap-x-0.5 sm:gap-x-1">
      <PaginationButton
        data-test="pagination-prev-button"
        label="<"
        :callback="postStore.getPreviousPage"
        :disabled="!postStore.previousPage"
      />
      <li v-for="n in postStore.pageCount" :key="n">
        <button
          data-test="pagination-page-button"
          v-if="n !== postStore.currentPage"
          class="btn btn-square btn-ghost btn-sm text-sm active:bg-secondary"
          @click="
            postStore.getPosts({
              limit: 6,
              offset: (n - 1) * 6,
              search: route.query.q,
              tag: route.name === `${type}-posts-by-tag` ? route.params.slug : undefined
            })
          "
        >
          {{ n }}
        </button>
        <!-- keep bg-secondary. Somehow button happen to become muted faster than active status works on not disabled button (above). That's strange -->
        <button
          data-test="pagination-current-page-button"
          v-if="n === postStore.currentPage"
          class="btn btn-disabled btn-ghost btn-sm text-sm active:bg-secondary"
        >
          {{ n }}
        </button>
        <!-- <span
          v-show="n === postStore.currentPage"
          class="relative block rounded bg-base-300 px-3 py-1.5 text-sm font-medium"
        >
          {{ n }}
        </span> -->
      </li>
      <PaginationButton
        data-test="pagination-next-button"
        label=">"
        :callback="postStore.getNextPage"
        :disabled="!postStore.nextPage"
      />
    </ul>
  </nav>
</template>
