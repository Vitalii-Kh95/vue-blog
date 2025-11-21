<script setup lang="ts">
import IconAPI from '@/assets/icons/IconAPI.min.svg?raw';
import IconSQL from '@/assets/icons/IconSQL.min.svg?raw';
import IconDjango from '@/assets/icons/IconDjango.min.svg?raw';
import { SkillsDescription } from '@/constants';
</script>

<template>
  <div v-once class="col-span-18 row-span-2 flex flex-col gap-1 px-1 text-start">
    <h3 class="px-1 text-end font-serif text-2xl font-bold md:text-3xl">Back-end</h3>
    <div class="flex gap-x-1">
      <div class="*w-6 mt-1.5 shrink-0 *:h-6" v-html="IconDjango" />
      {{ SkillsDescription.backend.django }}
    </div>
    <div class="flex gap-x-1">
      <div class="*w-6 mt-1.5 shrink-0 *:h-6" v-html="IconSQL" />
      {{ SkillsDescription.backend.sql }}
    </div>
    <div class="flex gap-x-1">
      <div class="mt-1 shrink-0" v-html="IconAPI" />
      {{ SkillsDescription.backend.restfulAPI }}
    </div>
  </div>
</template>
