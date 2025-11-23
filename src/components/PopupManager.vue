<template>
  <div
    class="fixed left-1/2 top-4 z-50 flex -translate-x-1/2 flex-col gap-1"
    :style="{ width: `${popupMaxWidth}px` }"
  >
    <Popup
      v-for="popup in popupStore.popups"
      :id="popup.id"
      :key="popup.id"
      :message="popup.message"
      :type="popup.type"
      @close="handleClose"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { usePopupStore } from '@/stores/PopupStore';
import Popup from '@/components/PopupMessage.vue';
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core';

const breakpoints = useBreakpoints(breakpointsTailwind);
const popupStore = usePopupStore();

const handleClose = (id: symbol) => {
  popupStore.close(id); // Call the store's close method
};
const popupMaxWidth = ref(400);
const adjustPopupWidth = () => {
  if (breakpoints.greaterOrEqual('xl').value) {
    popupMaxWidth.value = 700;
  } else if (breakpoints.active().value === 'lg') {
    popupMaxWidth.value = 600;
  } else if (breakpoints.active().value === 'md') {
    popupMaxWidth.value = 500;
  } else {
    popupMaxWidth.value = 340;
  }
};
onMounted(() => {
  adjustPopupWidth();
});
watch(breakpoints.active(), adjustPopupWidth);
watch(popupStore.popups, (newVal, oldVal) => {
  console.log('Popup list changed:');
  console.log('Old:', oldVal);
  console.log('New:', newVal);
});
</script>
