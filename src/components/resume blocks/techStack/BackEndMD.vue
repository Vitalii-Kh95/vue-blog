<script setup lang="ts">
// import IconPython from '@/components/icons/IconPython.vue';
// import IconDjango from '@/components/icons/IconDjango.vue';
// import IconSQL from '@/components/icons/IconSQL.vue';
// import IconAPI from '@/components/icons/IconAPI.vue';
import IconPython from '@/assets/icons/IconPython.min.svg?raw';
import IconAPI from '@/assets/icons/IconAPI.min.svg?raw';
import IconSQL from '@/assets/icons/IconSQL.min.svg?raw';
import IconDjango from '@/assets/icons/IconDjango.min.svg?raw';
import TechStackGrid from './TechStackGrid.vue';
import BackEndSkills from './BackEndSkills.vue';
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core';

const breakpoints = useBreakpoints(breakpointsTailwind);

const backendItems = [
  {
    title: 'Python',
    icon: IconPython
  },
  {
    title: 'Django',
    icon: IconDjango
  },
  {
    title: 'SQL',
    icon: IconSQL
  },
  {
    title: 'RESTful API',
    icon: IconAPI
  }
];
</script>

<template>
  <div class="col-span-18 row-span-2 gap-1 text-start subgrid">
    <h3 class="col-span-18 row-span-1 px-1 font-serif text-3xl font-bold xl:px-4 xl:text-end">
      Back-end
    </h3>
    <div class="col-span-18 row-span-1 p-3 subgrid">
      <TechStackGrid
        class="col-span-5 mt-1 xl:col-span-7 xl:mt-2 2xl:mt-1"
        :items="breakpoints.greaterOrEqual('xl').value ? backendItems : backendItems.slice(1, 4)"
      />
      <BackEndSkills class="col-span-12 col-start-7 xl:col-span-10 xl:col-start-9" />
    </div>
  </div>
</template>
