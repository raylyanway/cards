import { ColorSchemeName } from 'react-native';
import { create } from 'zustand';

import { themedColors } from '@/config/typography';
import { timeIntervals } from '@/constants';
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
  refreshProgress: () => void;
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
    },
    refreshProgress: () => {
      const learnedCards = get().learnedCards;
      const updatedLearnedCards = learnedCards.reduce<ILearnedCard[]>(
        (acc, card) => {
          if (card.timesLearned >= timeIntervals.length) {
            acc.push(card);
            return acc;
          }

          const now = Date.now();
          const maxTime =
            card.lastTimeLearned + timeIntervals[card.timesLearned];

          if (now > maxTime) {
            // Calculate how many intervals have passed since lastTimeLearned
            let newTimesLearned = card.timesLearned;
            let elapsed = now - card.lastTimeLearned;

            while (
              newTimesLearned > 0 &&
              elapsed > timeIntervals[newTimesLearned]
            ) {
              elapsed -= timeIntervals[newTimesLearned];
              newTimesLearned--;
            }

            if (newTimesLearned === 0) {
              // Remove card if all intervals have passed
              return acc;
            }

            acc.push({
              ...card,
              timesLearned: newTimesLearned
            });
          } else {
            acc.push(card);
          }

          return acc;
        },
        []
      );

      setStore({ learnedCards: updatedLearnedCards });
    }
  };
});
