import { defineStore } from 'pinia';
import type { Popup } from '@/types';

export const usePopupStore = defineStore('popupStore', {
  state: () => {
    return {
      popups: [] as Popup[]
    };
  },

  actions: {
    show(config: Omit<Popup, 'id'>) {
      // Add the new popup to the array
      const id = Symbol();
      this.popups.push({ id, ...config });
    },

    close(id: symbol) {
      const idx = this.popups.findIndex((p) => p.id === id);
      if (idx !== -1) this.popups.splice(idx, 1);
    }
  }
});
