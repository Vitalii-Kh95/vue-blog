<template>
  <div
    class="alert relative flex transform justify-between rounded-full p-4 shadow-lg transition-opacity duration-5000 ease-in"
    :class="[faded ? 'opacity-0' : 'opacity-100', props.type]"
  >
    <span class="pl-4 text-center">
      <slot>{{ message }}</slot>
    </span>
    <!-- text-error overriden by dark:btn-neutral unless !important -->
    <button
      class="btn btn-circle btn-sm border-none text-xl !text-error shadow-md dark:btn-neutral"
      @click="closePopup(id)"
    >
      &times;
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';

const faded = ref(false);

const fadeTimeout = setTimeout(() => fadeOut(), 1000); // Start fade-out earlier
const autoCloseTimeout = setTimeout(() => closePopup(), 6000);

function fadeOut() {
  faded.value = true; // Start fade-out effect
}

const closePopup = () => {
  if (autoCloseTimeout) clearTimeout(autoCloseTimeout);
  if (fadeTimeout) clearTimeout(fadeTimeout);
  emit('close', props.id); // Emit closePopup event
};

const props = defineProps({
  id: {
    type: Symbol,
    required: true
  },
  message: String,
  type: {
    type: String,
    default: 'alert-error'
  }
});
const emit = defineEmits(['close']);

onBeforeUnmount(() => {
  if (autoCloseTimeout) clearTimeout(autoCloseTimeout);
  if (fadeTimeout) clearTimeout(fadeTimeout);
});
</script>
