import { create } from 'zustand';

import { themedColors } from '@/config';
import { ITheme, IThemedColors } from '@/types';
import { getLearnedCards, setLearnedCards } from '@/utils/storage';

interface State {
  computed: {
    colors: IThemedColors;
    isLightTheme: boolean;
    oppositeColors: IThemedColors;
  };
  setTheme: (theme: ITheme) => void;
  theme: ITheme;
  learnedCards: number[];
  setLearnedCards: (ids: number[]) => void;
  addLearnedCard: (id: number) => void;
  hydrate: () => Promise<void>;
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
  setTheme: (theme: ITheme) => set({ theme }),
  theme: 'light' as const,
  learnedCards: [],
  setLearnedCards: (ids) => {
    set({ learnedCards: ids });
    setLearnedCards(ids);
  },
  addLearnedCard: (id) => {
    console.log('Adding learned card:', id);
    const ids = get().learnedCards;
    if (!ids.includes(id)) {
      const updated = [...ids, id];
      set({ learnedCards: updated });
      setLearnedCards(updated);
    }
  },
  hydrate: async () => {
    const ids = await getLearnedCards();
    set({ learnedCards: ids });
  }
}));
