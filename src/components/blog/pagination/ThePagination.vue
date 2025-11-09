<script setup>
import PaginationButton from './paginationButton.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePostStore } from '@/stores/PostStore';
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core';

const breakpoints = useBreakpoints(breakpointsTailwind);
const route = useRoute();
const postStore = usePostStore();
const pageSize = 6;
const buttonAmount = computed(() => {
  if (breakpoints.greaterOrEqual('xl').value) {
    return 11;
  } else if (['lg', 'md'].includes(breakpoints.active().value)) {
    return 9;
  } else if (breakpoints.active().value === 'sm') {
    return 7;
  } else {
    return 5;
  }
});

const pageButtonsDisplayed = computed(() => {
  if (postStore.pageCount <= 1) return;

  const ButtonAmount = Math.min(buttonAmount.value, postStore.pageCount);

  const left = [];
  const right = [];

  let l = postStore.currentPage - 1;
  let r = postStore.currentPage + 1;

  while (left.length + right.length + 1 < ButtonAmount) {
    if (l >= 1) {
      left.push(l);
      l--;
      if (left.length + right.length + 1 >= ButtonAmount) break;
    }
    if (r <= postStore.pageCount) {
      right.push(r);
      r++;
    }
  }
  return [...left.reverse(), postStore.currentPage, ...right];
});
</script>

<template>
  <nav v-show="postStore.pageCount > 1" aria-label="Paginate me" data-test="pagination-navigation">
    <ul class="flex gap-x-0.5 sm:gap-x-1">
      <PaginationButton
        data-test="pagination-first-button"
        label="<<"
        :callback="postStore.getPosts"
        :disabled="!postStore.previousPage"
      />
      <PaginationButton
        data-test="pagination-prev-button"
        label="<"
        :callback="postStore.getPreviousPage"
        :disabled="!postStore.previousPage"
      />
      <li v-for="n in pageButtonsDisplayed" :key="n">
        <button
          data-test="pagination-page-button"
          v-if="n !== postStore.currentPage"
          class="btn btn-square btn-ghost btn-sm text-sm active:bg-secondary"
          @click="
            postStore.getPosts({
              limit: pageSize,
              offset: (n - 1) * pageSize,
              search: route.query.q,
              tag: route.name === 'blog-posts-by-tag' ? route.params.slug : undefined
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
      </li>
      <PaginationButton
        data-test="pagination-next-button"
        label=">"
        :callback="postStore.getNextPage"
        :disabled="!postStore.nextPage"
      />
      <PaginationButton
        data-test="pagination-last-button"
        label=">>"
        :callback="
          () =>
            postStore.getPosts({
              limit: pageSize,
              offset:
                postStore.count % pageSize > 0
                  ? postStore.count - (postStore.count % pageSize)
                  : postStore.count - pageSize
            })
        "
        :disabled="!postStore.nextPage"
      />
    </ul>
  </nav>
</template>
