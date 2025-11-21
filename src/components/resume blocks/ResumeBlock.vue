<template>
  <div class="relative m-1 flex w-full flex-col text-base-content md:pt-6">
    <!-- <keep-alive>
      <component
        :is="['sm', 'md'].includes(breakpoints.active().value) ? GradientHeader : RibbonHeader"
        :title="title"
      />
    </keep-alive> -->

    <!-- gradient header -->
    <div v-show="['sm', 'md'].includes(breakpoints.active().value)" class="">
      <div class="rounded-lg p-2 text-center">
        <h1 class="text-2xl font-bold">{{ title }}</h1>
      </div>
      <div
        class="h-1 rounded-lg bg-gradient-to-r from-base-300 via-neutral to-base-300 p-0.5 text-center"
      ></div>
    </div>
    <!-- /gradient header -->

    <!-- ribbon header -->
    <div
      v-show="!['sm', 'md'].includes(breakpoints.active().value)"
      class="z-9 absolute left-0 flex w-[calc(100%+10px)] items-center bg-neutral/85 px-4 py-2 text-lg font-bold text-white"
    >
      {{ title }}
      <!-- Fold Effect (Triangle Cut) -->
      <div
        class="absolute right-0 top-full h-[10px] w-[9px] bg-neutral/85 [clip-path:polygon(0_0,100%_0,0_100%)]"
      ></div>
    </div>
    <!-- /ribbon header -->

    <div
      class="ml-[1px] p-4"
      :class="
        ['sm', 'md'].includes(breakpoints.active().value)
          ? ''
          : 'mt-11 rounded-b-lg bg-base-100 shadow-md'
      "
    >
      <div class="m-0 w-fit sm:mx-auto lg:mx-0">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import GradientHeader from './GradientHeader.vue';
// import RibbonHeader from './RibbonHeader.vue';
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core';

const breakpoints = useBreakpoints(breakpointsTailwind);

interface Props {
  title: string;
}
const { title } = defineProps<Props>();
</script>
