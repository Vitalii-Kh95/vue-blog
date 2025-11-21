<script setup lang="ts">
// import IconJavaScript from '@/components/icons/IconJavaScript.vue';
// import IconTypeScript from '@/components/icons/IconTypeScript.vue';
// import IconVue from '@/components/icons/IconVue.vue';
// import IconTailwind from '@/components/icons/IconTailwind.vue';
import IconJavaScript from '@/assets/icons/IconJavaScript.min.svg?raw';
import IconTypeScript from '@/assets/icons/IconTypeScript.min.svg?raw';
import IconVue from '@/assets/icons/IconVue.min.svg?raw';
import IconTailwind from '@/assets/icons/IconTailwind.min.svg?raw';
import TechStackGrid from './TechStackGrid.vue';
import FrontEndSkills from './FrontEndSkills.vue';
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core';

const breakpoints = useBreakpoints(breakpointsTailwind);

const frontendItems = [
  {
    title: 'JavaScript',
    icon: IconJavaScript
  },
  {
    title: 'TypeScript',
    icon: IconTypeScript
  },
  {
    title: 'Vue',
    icon: IconVue
  },
  {
    title: 'TailwindCSS',
    icon: IconTailwind
  }
];
</script>

<template>
  <div class="col-span-18 row-span-2 gap-1 text-start subgrid">
    <h3 class="col-span-18 row-span-1 px-1 font-serif text-3xl font-bold">Front-end</h3>
    <div class="col-span-18 row-span-1 p-3 subgrid">
      <FrontEndSkills class="col-span-12 xl:col-span-10" />

      <TechStackGrid
        :items="breakpoints.greaterOrEqual('xl').value ? frontendItems : frontendItems.slice(1, 4)"
        class="col-span-5 col-start-[14] xl:col-span-7 xl:col-start-12 2xl:mt-1"
      />
    </div>
  </div>
</template>
