<script setup lang="ts">
import PaginationButton from './paginationButton.vue';
import { computed, ref, watch, nextTick } from 'vue';
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

const seeded = ref(false);

// reset when route changes so we can seed again for a different page/listing

// watch(
//   [() => route.fullPath, () => postStore.pageCount],
//   async ([fullPath, pageCount], [oldPath, oldCount]) => {
//     // If route changed, allow re-seeding on the new route
//     if (fullPath !== oldPath) {
//       seeded.value = false;
//     }

//     if (!seeded.value && pageCount > 1) {
//       // Wait a microtask to ensure all reactivity settled (the nextTick inside patch helps too)
//       await nextTick();
//       await patchInitialPaginationState(oldPath);
//       seeded.value = true;
//     }
//   },
//   { immediate: true, flush: 'post' }
// );

watch(
  () => route.fullPath,
  async () => {
    // Reset seeded flag when navigating to a new route
    seeded.value = false;

    // Wait a tick to ensure pageCount is updated
    await nextTick();

    // Only seed if posts exist
    if (postStore.pageCount > 1 && !seeded.value) {
      const vueState = window.history.state || {};
      if (!vueState.pagination) {
        // Only replaceState here
        window.history.replaceState(
          {
            ...vueState,
            pagination: {
              page: postStore.currentPage,
              pageSize: postStore.pageSize,
              filters: { q: route.query.q, tag: route.params.slug }
            }
          },
          '',
          window.location.href
        );
      }
      seeded.value = true;
    }
  },
  { immediate: true, flush: 'post' }
);

async function withPaginationHandler(fn, args) {
  // I can't really get arguments which end up in function.
  // So I will work with aftermath (postStore states and URL)
  await (args !== undefined ? fn(args) : fn());

  const vueState = window.history.state || {};
  window.history.pushState(
    {
      ...vueState,
      pagination: {
        page: postStore.currentPage,
        pageSize: postStore.pageSize,
        filters: { q: route.query.q, tag: route.params.slug }
      }
    },
    '',
    window.location.href
  );
}
</script>

<template>
  <nav v-show="postStore.pageCount > 1" aria-label="Paginate me" data-test="pagination-navigation">
    <ul class="flex gap-x-0.5 sm:gap-x-1">
      <PaginationButton
        data-test="pagination-first-button"
        label="<<"
        :disabled="!postStore.previousPage"
        @click="withPaginationHandler(postStore.getPreviousPage)"
      />
      <PaginationButton
        data-test="pagination-prev-button"
        label="<"
        :disabled="!postStore.previousPage"
        @click="withPaginationHandler(postStore.getPreviousPage)"
      />
      <li v-for="n in pageButtonsDisplayed" :key="n">
        <button
          v-if="n !== postStore.currentPage"
          data-test="pagination-page-button"
          class="btn btn-square btn-ghost btn-sm text-sm active:bg-secondary"
          @click="
            withPaginationHandler(postStore.getPosts, {
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
          v-if="n === postStore.currentPage"
          data-test="pagination-current-page-button"
          class="btn btn-disabled btn-ghost btn-sm text-sm active:bg-secondary"
        >
          {{ n }}
        </button>
      </li>
      <PaginationButton
        data-test="pagination-next-button"
        label=">"
        :disabled="!postStore.nextPage"
        @click="withPaginationHandler(postStore.getNextPage)"
      />
      <PaginationButton
        data-test="pagination-last-button"
        label=">>"
        :disabled="!postStore.nextPage"
        @click="
          withPaginationHandler(postStore.getPosts, {
            limit: pageSize,
            offset:
              postStore.count % pageSize > 0
                ? postStore.count - (postStore.count % pageSize)
                : postStore.count - pageSize
          })
        "
      />
    </ul>
  </nav>
</template>
