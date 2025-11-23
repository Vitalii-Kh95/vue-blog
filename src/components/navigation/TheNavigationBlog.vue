<script setup lang="ts">
import SearchBox from './NavigationSearch.vue';
import ProfileMenu from './NavigationProfileMenu.vue';
import Menu from './NavigationMenu.vue';
import ThemeSwitcher from './ThemeSwitcher.vue';
import SearchButton from './NavigationSearchButton.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core';

const breakpoints = useBreakpoints(breakpointsTailwind);

const route = useRoute();

const menuItems = [
  { displayedName: 'back to portfolio', routeName: 'portfolio' },
  { displayedName: 'home', routeName: 'blog' }
];

const displaySearch = computed(() => {
  return !route.path.includes('search');
});
</script>
<template>
  <div class="navbar sticky top-0 z-20 bg-neutral px-0 py-0 text-neutral-content">
    <Menu
      class="navbar-start ps-1"
      :menu-items="menuItems"
    />

    <div class="navbar-end flex-grow gap-2">
      <component
        :is="breakpoints.smallerOrEqual('md').value ? SearchButton : SearchBox"
        v-if="displaySearch"
      />
      <ProfileMenu />
      <ThemeSwitcher class="pr-5" />
    </div>
  </div>
</template>
