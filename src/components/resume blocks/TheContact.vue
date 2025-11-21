<script setup lang="ts">
import ResumeBlock from './ResumeBlock.vue';
</script>

<template>
  <ResumeBlock title="Contact">
    <slot>
      <h2>Phone: +998 94 720 80 15</h2>
      <h2><a href="mailto:mew030995@gmail.com" class="link">Email: mew030995@gmail.com</a></h2>
      <h2>
        <a href="https://github.com/Vitalii-Kh95" class="link">Github: github.com/Vitalii-Kh95</a>
      </h2>
      <h2><a href="https://t.me/Whippoorwill95" class="link">Telegram: @Whippoorwill95</a></h2>
      <h2>
        <a class="link" href="https://www.linkedin.com/in/vitalii-kholmukhamedov-7666bb264/"
          >linkedin</a
        >
      </h2>
    </slot>
  </ResumeBlock>
</template>
