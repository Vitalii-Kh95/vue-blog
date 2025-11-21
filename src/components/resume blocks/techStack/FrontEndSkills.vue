<script setup lang="ts">
import { SkillsDescription } from '@/constants';
</script>
<template>
  <div class="flex flex-col justify-evenly font-serif text-xl">
    <!-- <ul class="*:py-0.5 *:xl:py-0 *:2xl:py-0.5"> -->
    <div>
      <strong class="font-sans">TypeScript</strong> – {{ SkillsDescription.frontend.typescript }}
    </div>
    <div><strong class="font-sans">Vue</strong> – {{ SkillsDescription.frontend.vue }}</div>
    <div>
      <strong class="font-sans">Tailwind CSS</strong> – {{ SkillsDescription.frontend.tailwind }}
    </div>
  </div>
</template>
