import { StateCreator } from 'zustand';

import { themedColors } from '@/config/typography';

import { IAllSlices, ISettingSlice } from './types';

export const createSettingSlice: StateCreator<
  IAllSlices,
  [],
  [],
  ISettingSlice
> = (set, get) => ({
  theme: 'dark',
  autoPronounce: false,
  setTheme: (theme) => set({ theme }),
  setAutoPronounce: (autoPronounce) => set({ autoPronounce }),
  computedTheme: {
    get colors() {
      return get().theme === 'light' ? themedColors.light : themedColors.dark;
    },
    get oppositeColors() {
      return get().theme === 'light' ? themedColors.dark : themedColors.light;
    },
    get isLightTheme() {
      return get().theme === 'light';
    }
  }
});
