import { create } from 'zustand';

import { themedColors } from '@/config';
import { ITheme, IThemedColors } from '@/types';

import { getStorage, setStorage } from './storage';

interface State {
  computed: {
    colors: IThemedColors;
    isLightTheme: boolean;
    oppositeColors: IThemedColors;
  };
  setTheme: (theme: ITheme) => void;
  theme: ITheme | null;
  learnedCards: number[];
  addLearnedCard: (id: number) => void;
  hydrate: () => Promise<void>;
}

export const useGlobalStore = create<State>()((set, get) => {
  const setStore = async (
    stateOrUpdater: Partial<State> | ((state: State) => Partial<State>)
  ) => {
    set((prev) => {
      const nextState =
        typeof stateOrUpdater === 'function'
          ? (stateOrUpdater as (state: State) => Partial<State>)(prev)
          : stateOrUpdater;
      const merged = { ...prev, ...nextState };

      const persistState = async (nextState: Partial<State>) => {
        const storageData = await getStorage();
        setStorage({ ...storageData, ...nextState });
      };
      persistState(nextState);

      return merged;
    });
  };

  return {
    theme: null,
    learnedCards: [],
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
    setTheme: (theme: ITheme) => setStore({ theme }),
    addLearnedCard: (id) => {
      const ids = get().learnedCards;
      if (!ids.includes(id)) {
        const updated = [...ids, id];
        setStore({ learnedCards: updated });
      }
    },
    hydrate: async () => {
      const data = await getStorage();
      set((prev) => ({ ...prev, ...data }));
    }
  };
});
