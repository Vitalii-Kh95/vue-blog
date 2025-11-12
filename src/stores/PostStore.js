import { defineStore } from 'pinia';
import { getPosts, getPost, parseUrlParams } from '@/utils/functionsAPIRelated';

export const usePostStore = defineStore('postStore', {
  state: () => {
    return {
      count: null,
      pageSize: null,
      currentPage: null,
      nextPage: null,
      previousPage: null,
      posts: [],
      post: null
    };
  },

  getters: {
    pageCount: (state) => {
      if (state.count) {
        return Math.ceil(state.count / state.pageSize);
      } else {
        return null;
      }
    }
  },

  actions: {
    async getPosts({ limit = 6, offset = 0, search, tag } = {}) {
      this.pageSize = limit;
      this.currentPage = offset / limit + 1;
      ({
        count: this.count,
        next: this.nextPage,
        previous: this.previousPage,
        results: this.posts
      } = await getPosts({ limit: limit, offset: offset, search: search, tag: tag }));
    },

    async getPreviousPage() {
      const { limit, offset, search, tag } = await parseUrlParams(this.previousPage);
      await this.getPosts({ limit, offset, search, tag });
    },

    async getNextPage() {
      const { limit, offset, search, tag } = await parseUrlParams(this.nextPage);
      await this.getPosts({ limit, offset, search, tag });
    },

    async getPost(slug) {
      this.post = await getPost({ slug: slug });
    }
  }
});
