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
  getColors: () => {
    return get().theme === 'light' ? themedColors.light : themedColors.dark;
  },
  getOppositeColors: () => {
    return get().theme === 'light' ? themedColors.dark : themedColors.light;
  },
  getIsLightTheme: () => {
    return get().theme === 'light';
  }
});
