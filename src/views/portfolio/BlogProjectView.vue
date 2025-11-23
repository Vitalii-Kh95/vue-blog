<script setup lang="ts">
import { useHealthStore } from '@/stores/HealthStore';

const healthStore = useHealthStore();
</script>

<template>
  <div class="container flex flex-col items-center gap-y-3">
    <h1 class="text-center text-base-content/90 sm:font-semibold md:text-lg">
      A personal blog site with a clean design and responsive layout that looks good on any screen —
      from phones to desktops. It includes essential features like user authentication, secure data
      access, and dynamic content management. Powered by Django and Vue.
    </h1>
    <span v-if="healthStore.blogAPIStatus === 'ok'"
      ><router-link
        class="link-info text-lg font-semibold underline"
        :to="{ name: 'blog-home' }"
        >Click here to see it in action!</router-link
      >
      or check out screenshots below.</span
    >

    <div class="flex w-full gap-x-6 pb-4 pt-1 lg:gap-x-12 lg:pb-8 xl:pb-9">
      <div
        class="basis-[74.2%] rounded-sm outline outline-1 outline-offset-8 outline-base-content/20 md:rounded-xl"
      >
        <img
          src="/Screenshot_table_1080x667.webp"
          alt=""
          class="aspect-[1080/667] w-full rounded-sm object-contain md:rounded-xl"
        />
      </div>
      <div
        class="basis-[25.8%] rounded-sm outline outline-1 outline-offset-8 outline-base-content/20 md:rounded-xl"
      >
        <img
          src="/Screenshot_mobile_375x667.webp"
          alt=""
          class="aspect-[375/667] w-full rounded-sm object-contain md:rounded-xl"
        />
      </div>
    </div>

    <div
      class="rounded-sm pb-1 outline outline-1 outline-offset-8 outline-base-content/20 md:rounded-xl"
    >
      <img
        src="/BlogScreenshot.webp"
        alt=""
        class="h-auto w-full rounded-sm md:rounded-xl"
      />
    </div>
    <div class="flex w-full flex-col gap-x-3 gap-y-2 pb-2 lg:flex-row">
      <div>
        <h3 class="my-2 text-xl">🔧 Backend Features (Django REST Framework)</h3>
        <ul class="list-inside list-disc ps-2">
          <li>RESTful API serving structured data to the frontend.</li>
          <li>Secure user authentication with session-based login and CSRF protection.</li>
          <li>Relational database integration with Django ORM.</li>
          <li>Built-in filtering and pagination for scalable content delivery.</li>
        </ul>
      </div>
      <div class="">
        <h3 class="my-2 text-xl">💻 Frontend Features (Vue 3)</h3>
        <ul class="list-inside list-disc ps-2">
          <li>Interactive interface powered by Vue and connected to the backend via API.</li>
          <li>Dynamic page routing with on-demand component loading (Vue Router).</li>
          <li>Centralized state management (Pinia) handling user sessions and data flow.</li>
          <!-- <li>Route protection for pages requiring login.</li> -->
        </ul>
      </div>
      <div>
        <h3 class="my-2 text-xl">🎨 UI and Design (Tailwind CSS)</h3>
        <ul class="list-inside list-disc ps-2">
          <li>Clean, responsive layout suitable for various screen sizes and devices.</li>
          <li>Utility-based styling for fast and consistent UI development.</li>
        </ul>
      </div>
    </div>

    <router-link
      v-if="healthStore.blogAPIStatus === 'ok'"
      class="btn btn-primary"
      :to="{ name: 'blog-home' }"
    >
      See it in action!
    </router-link>
    <p
      v-else
      class="px-4 text-lg text-error"
    >
      Sorry! Live demonstration isn't available at the moment.
    </p>
  </div>
</template>
