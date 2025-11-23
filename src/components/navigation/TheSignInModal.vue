<script setup lang="ts">
// import IconPasswordKey from '@/components/icons/IconPasswordKey.vue';
// import IconUsername from '@/components/icons/IconUsername.vue';
import IconPasswordKey from '@/assets/icons/IconPasswordKey.min.svg?raw';
import IconUsername from '@/assets/icons/IconUsername.min.svg?raw';
import { useUserStore } from '@/stores/UserStore';
import { ref, computed } from 'vue';

const userStore = useUserStore();
const modal = ref<HTMLDialogElement | null>(null);

async function login(event: Event) {
  const formData = new FormData(event.target as HTMLFormElement);
  const logined = await userStore.login(
    formData.get('username') as string,
    formData.get('password') as string
  );
  if (logined) close();
}
// Extract errors from the store
const errors = computed(() =>
  typeof userStore.errorMessage === 'object' ? userStore.errorMessage : {}
);

// Separate general error message (only show if it's a string)
const generalError = computed<string>(
  () => errors.value['detail'] || errors.value['non_field_errors'] || ''
);

// Extract field-specific errors
const usernameError = computed(
  () => errors.value['username'] || errors.value['username or email'] || ''
);
const passwordError = computed(() => errors.value['password'] || '');

const showModal = () => modal.value?.showModal();
const close = () => modal.value?.close();

defineExpose({ showModal, close });
</script>

<template>
  <dialog
    ref="modal"
    class="modal"
  >
    <div class="modal-box w-1/6 min-w-max max-w-xl overflow-hidden">
      <form
        class="flex flex-col gap-4"
        @submit.prevent="login"
      >
        <h3 class="self-center text-lg font-bold">Sign In!</h3>
        <p
          v-if="generalError"
          class="text-red-500"
        >
          {{ generalError }}
        </p>
        <div>
          <div class="label">
            <span class="label-text">Username or Email:</span>
          </div>
          <label class="input input-bordered flex items-center gap-2">
            <div
              class="h-4 w-4 shrink-0"
              v-html="IconUsername"
            />
            <input
              type="text"
              name="username"
              class="grow"
              autocomplete="on"
            />
          </label>
          <p
            v-if="usernameError"
            class="pt-1 text-sm text-red-500"
          >
            {{ usernameError }}
          </p>
        </div>
        <div>
          <div class="label">
            <span class="label-text">Password:</span>
          </div>
          <label class="input input-bordered flex items-center gap-2">
            <div
              class="h-4 w-4 shrink-0"
              v-html="IconPasswordKey"
            />
            <input
              type="password"
              class="grow"
              name="password"
              value=""
            />
          </label>
          <p
            v-if="passwordError"
            class="pt-1 text-sm text-red-500"
          >
            {{ passwordError }}
          </p>
        </div>
        <div class="modal-action flex justify-between">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button
              class="btn"
              @click="close"
            >
              Close
            </button>
          </form>
          <button
            type="submit"
            class="btn btn-primary"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  </dialog>
</template>
