<script setup lang="ts"></script>

<template>
  <router-link
    :to="{
      name: 'blog-search',
      query: { q: '' }
    }"
    class="group btn btn-circle btn-ghost hover:bg-inherit"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 group-hover:h-6 group-hover:w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  </router-link>
</template>
