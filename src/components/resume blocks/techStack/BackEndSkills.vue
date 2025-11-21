<script setup lang="ts">
import { SkillsDescription } from '@/constants';
</script>
<template>
  <div class="flex flex-col justify-between py-2 font-serif text-xl xl:py-0">
    <!-- <ul class="*:py-0.5 *:xl:py-0 *:2xl:py-0.5"> -->
    <div><strong class="font-sans">Django</strong> – {{ SkillsDescription.backend.django }}</div>
    <div><strong class="font-sans">SQL</strong> – {{ SkillsDescription.backend.sql }}</div>
    <div>
      <strong class="font-sans">RESTful API</strong> – {{ SkillsDescription.backend.restfulAPI }}
    </div>
  </div>
</template>
