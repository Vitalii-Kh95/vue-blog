<script setup lang="ts">
interface TechStackItem {
  title: string;
  icon: string;
}

interface Props {
  items: TechStackItem[];
}

defineProps<Props>();
</script>

<template>
  <div class="grid grid-cols-1 content-start gap-x-3 gap-y-5 xl:grid-cols-2 xl:gap-y-8">
    <div
      v-for="item in items"
      :key="item.title"
      class="flex h-[3.5rem] w-full rounded-sm bg-base-content/5 shadow-lg"
    >
      <!-- Left spacer -->
      <div class="flex-shrink grow basis-0" />

      <!-- Content -->
      <div class="flex gap-2 overflow-hidden rounded ps-1 pt-4">
        <div v-html="item.icon" class="h-7 w-7 shrink-0" />
        <div class="overflow-hidden text-ellipsis whitespace-nowrap font-mono text-xl font-medium">
          {{ item.title }}
        </div>
      </div>

      <!-- Right spacer -->
      <div class="flex-shrink grow basis-0" />
    </div>
  </div>
</template>
