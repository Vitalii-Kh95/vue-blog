<script setup lang="ts">
import IconHamburger from '@/assets/icons/IconHamburger.min.svg?raw';

interface MenuItem {
  routeName: string;
  displayedName: string;
}

interface Props {
  menuItems: MenuItem[];
}

const { menuItems } = defineProps<Props>();

const closeDropdown = () => {
  const elem = document.activeElement;
  if (elem) {
    (elem as HTMLElement).blur();
  }
};
</script>

<template>
  <div>
    <!-- mobile window size. Show menu as dropdown -->
    <div class="dropdown">
      <div
        tabindex="0"
        role="button"
        class="btn btn-ghost rounded-2xl sm:hidden"
      >
        <span
          class="*:mt-[3px] *:h-5 *:w-5"
          v-html="IconHamburger"
        />
        <span class="text-xl font-medium text-neutral-content/80 sm:hidden">menu</span>
      </div>
      <ul
        tabindex="0"
        role="menu"
        class="menu dropdown-content menu-md z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 text-base-content shadow"
      >
        <li
          v-for="item in menuItems"
          :key="item.routeName"
          @click="closeDropdown"
        >
          <router-link
            :to="{ name: item.routeName }"
            class="text-lg"
            :class="[$route.name === item.routeName ? 'pointer-events-none underline' : '']"
          >
            {{ item.displayedName }}
          </router-link>
        </li>
      </ul>
    </div>

    <!-- sm and higher window size. Show menu as horizontal list of items -->
    <div class="hidden sm:flex">
      <router-link
        v-for="item in menuItems"
        :key="item.routeName"
        :to="{ name: item.routeName }"
        class="btn btn-ghost px-2 text-xl text-neutral-content"
        :class="{ 'pointer-events-none underline': $route.name === item.routeName }"
      >
        {{ item.displayedName }}
      </router-link>
    </div>
  </div>
</template>
