<script setup lang="ts">
interface Props {
  label: string;
}

const { label } = defineProps<Props>();
</script>

<template>
  <li>
    <button class="btn btn-square btn-ghost btn-sm text-lg active:bg-secondary">
      {{ label }}
    </button>
  </li>
</template>
