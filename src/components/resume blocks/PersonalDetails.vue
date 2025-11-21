<script setup lang="ts">
import ResumeBlock from './ResumeBlock.vue';
</script>

<template>
  <ResumeBlock title="Personal Details">
    <slot>
      <h2>Languages: English, Russian</h2>
      <h2>Location: Uzbekistan</h2>
    </slot>
  </ResumeBlock>
</template>
