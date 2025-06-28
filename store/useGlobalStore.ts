import { ColorSchemeName } from 'react-native';
import { create } from 'zustand';

import { themedColors } from '@/config/typography';
import { ILearnedCard, ITheme, IThemedColors } from '@/types';

import { getStorage, setStorage } from './sqlStorage';

interface State {
  computed: {
    colors: IThemedColors;
    isLightTheme: boolean;
    oppositeColors: IThemedColors;
  };
  setTheme: (theme: ITheme) => void;
  theme: ITheme;
  learnedCards: ILearnedCard[];
  updateLearnedCard: (id: number) => void;
  hydrate: (colorScheme: ColorSchemeName) => Promise<void>;
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
    theme: 'dark',
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
    updateLearnedCard: (id) => {
      const learnedCards = get().learnedCards;
      const cardIndex = learnedCards.findIndex((card) => card.id === id);

      if (cardIndex === -1) {
        setStore({
          learnedCards: [
            ...learnedCards,
            { id, timesLearned: 1, lastTimeLearned: Date.now() }
          ]
        });
      } else {
        const updatedCards = [...learnedCards];
        updatedCards[cardIndex] = {
          ...updatedCards[cardIndex],
          timesLearned: updatedCards[cardIndex].timesLearned + 1,
          lastTimeLearned: Date.now()
        };
        setStore({ learnedCards: updatedCards });
      }
    },
    hydrate: async (colorScheme) => {
      const data = await getStorage();
      const theme = data?.theme || colorScheme || get().theme;

      set((prev) => ({ ...prev, ...data, theme }));
    }
  };
});
