<script setup lang="ts">
// import PortfolioCards from '@/components/portfolio/PortfolioCards.vue';
import { projects } from '@/constants';
</script>

<template>
  <div
    v-once
    class="w-full flex-1 overflow-auto"
  >
    <div class="container mx-auto space-y-4 px-4 py-6">
      <h1 class="text-center text-xl font-bold sm:text-2xl xl:text-4xl">
        My projects
      </h1>
      <div class="sticky top-0 z-10 bg-base-100">
        <div
          role="tablist"
          class="tabs tabs-bordered mx-auto max-w-2xl py-3"
        >
          <router-link
            v-for="project in projects"
            :key="project.routeByName"
            role="tab"
            class="tab font-semibold md:text-lg"
            active-class="tab-active"
            :to="{ name: project.routeByName }"
          >
            {{ project.title }}
          </router-link>
        </div>
      </div>
      <RouterView />
    </div>
  </div>
</template>
