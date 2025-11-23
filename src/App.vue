<script setup lang="ts">
import { RouterView } from 'vue-router';
import TheNavigation from '@/components/navigation/TheNavigation.vue';
import { useHealthStore } from '@/stores/HealthStore';
import { defineAsyncComponent, onBeforeUnmount, onMounted } from 'vue';

const healthStore = useHealthStore();

await healthStore.fetchHealthStatus();

const PopupManager = defineAsyncComponent(() => import('@/components/PopupManager.vue'));

// Mobile viewport height fix
function setMobileHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${String(vh)}px`);
}

onMounted(() => {
  // Set the initial height
  setMobileHeight();

  // Update on resize and orientation change
  window.addEventListener('resize', setMobileHeight);
  window.addEventListener('orientationchange', setMobileHeight);
});

onBeforeUnmount(() => {
  // Ensure retry interval is cleared when the app is unmounted
  healthStore.stopRetry();

  // Clean up event listeners
  window.removeEventListener('resize', setMobileHeight);
  window.removeEventListener('orientationchange', setMobileHeight);
});
</script>

<template>
  <div
    class="flex flex-col"
    :style="{ height: 'calc(var(--vh, 1vh) * 100)' }"
  >
    <!--
     sticky element (Navbar) is fixed only when it's in boundaries of initial parrent's height
     that is 100vh (h-screen)
     since some pages need to be scrollable, and go beyound 100vh,
     I wrapped RouterView in a div with overflow-hidden and fixed height
     Scrolling happens inside this element not Navbar's parent
     -->
    <TheNavigation />
    <div class="flex-1 overflow-hidden">
      <RouterView class="h-full overflow-auto" />
    </div>
    <!-- <RouterView class="flex-1 pt-[--menu-height]" /> -->
    <component
      :is="PopupManager"
      v-if="healthStore.usePopups"
    />
  </div>
</template>

<style>
/* Add this to your global CSS or keep it here if this component loads first */
:root {
  --vh: 1vh;
}
</style>
