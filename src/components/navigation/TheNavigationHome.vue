<script setup>
import ThemeSwitcher from './ThemeSwitcher.vue';
import Menu from './NavigationMenu.vue';

const menuItems = [
  { displayedName: 'resume', routeName: 'home' },
  { displayedName: 'portfolio', routeName: 'portfolio' }
];
</script>
<template>
  <div class="navbar sticky top-0 z-20 bg-neutral px-0 py-0 text-neutral-content">
    <Menu class="navbar-start ps-1" :menuItems="menuItems" />

    <div class="navbar-end flex-grow gap-2">
      <ThemeSwitcher class="pr-5" />
    </div>
  </div>
</template>
