<script setup lang="ts">
interface Props {
  label: string;
  callback: () => void;
  disabled: boolean;
}

const { label, callback, disabled } = defineProps<Props>();
</script>

<template>
  <li>
    <button
      :disabled="disabled"
      class="btn btn-square btn-ghost btn-sm text-lg active:bg-secondary"
      @click="callback"
    >
      {{ label }}
    </button>
  </li>
</template>
