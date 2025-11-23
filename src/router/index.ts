import { createRouter, createWebHistory } from 'vue-router';
import { usePostStore } from '@/stores/PostStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { title: 'Vitalii Kholmukhamedov' }
    },
    {
      path: '/portfolio',
      component: () => import('../views/portfolio/PortfolioView.vue'),
      meta: { title: 'Portfolio - Vitalii Kholmukhamedov' },
      children: [
        {
          path: '',
          name: 'portfolio',
          redirect: { name: 'portfolio-blog-project' }
        },
        {
          path: 'blog',
          name: 'portfolio-blog-project',
          component: () => import('../views/portfolio/BlogProjectView.vue')
        },
        {
          path: 'more-soon',
          name: 'portfolio-more-soon',
          component: () => import('../views/portfolio/MoreSoonView.vue')
        }
      ]
    },
    {
      path: '/blog',
      component: () => import('../views/blog/BlogLayout.vue'),
      meta: { blog: true },
      children: [
        {
          path: '',
          name: 'blog',
          component: () => import('../views/blog/BlogView.vue'),
          meta: { title: 'Blog Example' },
          beforeEnter: async () => {
            const postStore = usePostStore();
            await postStore.getPosts({});
          }
        },
        {
          path: 'search',
          name: 'blog-search',
          component: () => import('../views/blog/SearchView.vue'),
          // meta: { title: 'Blog Search' },
          meta: { skipAutoTitle: true },
          beforeEnter: async (to) => {
            const postStore = usePostStore();
            if (to.query.q && to.query.q !== '') {
              document.title = `Search "${String(to.query.q)}"`;
              await postStore.getPosts({ search: String(to.query.q) });
            } else {
              document.title = 'Blog Search';
              postStore.$reset();
            }
          }
        },
        {
          path: ':slug',
          name: 'blog-post-details',
          component: () => import('../views/blog/PostDetailsView.vue'),
          meta: { skipAutoTitle: true },
          beforeEnter: async (to) => {
            const postStore = usePostStore();
            await postStore.getPost(String(to.params.slug));
            document.title = postStore.post?.title || 'Blog Example';
          }
        },
        {
          path: 'tags/:slug',
          name: 'blog-posts-by-tag',
          component: () => import('../views/blog/TagView.vue'),
          meta: { skipAutoTitle: true },
          beforeEnter: async (to) => {
            const postStore = usePostStore();
            await postStore.getPosts({ tag: String(to.params.slug) });
            document.title = `#${String(to.params.slug)} - Blog Example`;
          }
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/components/NotFound.vue'),
      meta: { title: 'Not Found' }
    }
  ]
});

// router.beforeEach((to, from) => {
//   if (from.name?.startsWith('blog') && !to.name?.startsWith('blog')) {
//     postStore.$reset();
//   }
// });

router.afterEach((to) => {
  if (!to.meta.skipAutoTitle) {
    const defaultTitle = 'Kholmukhamedov Vitalii';
    document.title = String(to.meta.title) || defaultTitle;
  }
});

export default router;
