import { defineStore } from 'pinia';
import { getPosts, getPost, parseUrlParams } from '@/utils/functionsAPIRelated';
import type { GetPostsParams, Post } from '@/types';

interface PostStoreState {
  count: number | null;
  pageSize: number | null;
  currentPage: number | null;
  nextPage: string | null;
  previousPage: string | null;
  posts: Array<Post>;
  post: Post | null;
}

export const usePostStore = defineStore('postStore', {
  state: (): PostStoreState => {
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
      if (state.count && state.pageSize) {
        return Math.ceil(state.count / state.pageSize);
      } else {
        return null;
      }
    }
  },

  actions: {
    async getPosts({ limit = 6, offset = 0, search, tag }: GetPostsParams = {}) {
      this.pageSize = limit;
      this.currentPage = offset / limit + 1;
      const pageResponse = await getPosts({
        limit: limit,
        offset: offset,
        search: search,
        tag: tag
      });
      if (!pageResponse) {
        this.count = 0;
        this.nextPage = null;
        this.previousPage = null;
        this.posts = [];
      } else {
        ({
          count: this.count,
          next: this.nextPage,
          previous: this.previousPage,
          results: this.posts
        } = pageResponse);
      }
    },

    async getPreviousPage() {
      const { limit, offset, search, tag } = parseUrlParams(this.previousPage);
      await this.getPosts({ limit, offset, search, tag });
    },

    async getNextPage() {
      const { limit, offset, search, tag } = parseUrlParams(this.nextPage);
      await this.getPosts({ limit, offset, search, tag });
    },

    async getPost(slug: string | undefined) {
      this.post = await getPost({ slug: slug });
    }
  }
});
