import { create } from 'zustand';

import { themedColors } from '@/config';
import { Theme, ThemedColors } from '@/types';

interface State {
  computed: {
    colors: ThemedColors;
    isLightTheme: boolean;
    oppositeColors: ThemedColors;
  };
  setTheme: (theme: Theme) => void;
  theme: Theme;
}

export const useGlobalStore = create<State>()((set, get) => ({
  computed: {
    get colors() {
      return get().theme === 'light' ? themedColors.light : themedColors.dark;
    },
    get oppositeColors() {
      return get().theme === 'light' ? themedColors.dark : themedColors.light;
    },
    get isLightTheme() {
      return get().theme === 'light';
    }
  },
  setTheme: (theme: Theme) => set({ theme }),
  theme: 'light' as const
}));
