<script setup lang="ts">
// import IconTypeScript from '@/components/icons/IconTypeScript.vue';
// import IconVue from '@/components/icons/IconVue.vue';
// import IconTailwind from '@/components/icons/IconTailwind.vue';
import IconTypeScript from '@/assets/icons/IconTypeScript.min.svg?raw';
import IconVue from '@/assets/icons/IconVue.min.svg?raw';
import IconTailwind from '@/assets/icons/IconTailwind.min.svg?raw';
import { SkillsDescription } from '@/constants';
</script>

<template>
  <div
    v-once
    class="col-span-18 row-span-2 flex flex-col gap-1 px-1 text-start"
  >
    <h3 class="px-1 font-serif text-2xl font-bold md:text-3xl">
      Front-end
    </h3>
    <div class="flex gap-x-1">
      <div
        class="h-7 w-7 shrink-0"
        v-html="IconTypeScript"
      />
      {{ SkillsDescription.frontend.typescript }}
    </div>
    <div class="flex gap-x-1">
      <div
        class="mt-1 h-7 w-7 shrink-0"
        v-html="IconVue"
      />
      {{ SkillsDescription.frontend.vue }}
    </div>
    <div class="flex gap-x-1">
      <div
        class="mt-0.5 h-7 w-7 shrink-0"
        v-html="IconTailwind"
      />
      {{ SkillsDescription.frontend.tailwind }}
    </div>
  </div>
</template>
