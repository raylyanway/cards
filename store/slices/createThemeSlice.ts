import { StateCreator } from 'zustand';

import { themedColors } from '@/config/typography';
import { ITheme } from '@/types';

import { IAllSlices, IThemeSlice } from './types';

export const createThemeSlice: StateCreator<IAllSlices, [], [], IThemeSlice> = (
  set,
  get
) => ({
  theme: 'dark',
  setTheme: (theme: ITheme) => set({ theme }),
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
