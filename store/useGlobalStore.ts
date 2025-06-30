import { ColorSchemeName } from 'react-native';
import { create } from 'zustand';

import { themedColors } from '@/config/typography';
import { timeIntervals } from '@/constants';
import {
  ICard,
  ILearnedCard,
  ILearnedCardType,
  ITheme,
  IThemedColors
} from '@/types';

import { cards } from './cards';
import { getStorage, setStorage } from './sqlStorage';

interface State {
  computed: {
    colors: IThemedColors;
    isLightTheme: boolean;
    oppositeColors: IThemedColors;
  };
  setTheme: (theme: ITheme) => void;
  theme: ITheme;
  currentCards: ICard[];
  learnedCards: ILearnedCard[];
  learnedWords: ILearnedCard[];
  setCurrentCards: (cards: ICard[]) => void;
  hydrate: (colorScheme: ColorSchemeName) => Promise<void>;
  updateLearned: (key: ILearnedCardType, id: number) => void;
  refreshLearned: (key: ILearnedCardType) => void;
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
    currentCardType: cards,
    currentCards: cards,
    learnedCards: [],
    learnedWords: [],
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
    hydrate: async (colorScheme) => {
      const data = await getStorage();
      const theme = data?.theme || colorScheme || get().theme;

      set((prev) => ({ ...prev, ...data, theme }));
    },
    setCurrentCards: (cards) => set({ currentCards: cards }),
    updateLearned: (type, id) => {
      get().refreshLearned(type);
      const learnedItems = get()[type];
      const itemIndex = learnedItems.findIndex((card) => card.id === id);

      if (itemIndex === -1) {
        setStore({
          [type]: [
            ...learnedItems,
            { id, timesLearned: 1, lastTimeLearned: Date.now() }
          ]
        });
      } else {
        const item = learnedItems[itemIndex];
        if (item.timesLearned >= timeIntervals.length) return;

        const now = Date.now();
        const elapsedOverall = now - item.lastTimeLearned;
        const maxTimeInterval = timeIntervals[item.timesLearned];
        const minTimeInterval = timeIntervals[item.timesLearned - 1];

        if (
          elapsedOverall > minTimeInterval &&
          elapsedOverall <= maxTimeInterval
        ) {
          const updatedItems = [...learnedItems];
          updatedItems[itemIndex] = {
            ...updatedItems[itemIndex],
            timesLearned: updatedItems[itemIndex].timesLearned + 1,
            lastTimeLearned: Date.now()
          };
          setStore({ [type]: updatedItems });
        }
      }
    },
    refreshLearned: (type) => {
      const learnedItems = get()[type];
      const updatedLearnedItems = learnedItems.reduce<ILearnedCard[]>(
        (acc, card) => {
          if (card.timesLearned >= timeIntervals.length) {
            acc.push(card);
            return acc;
          }

          const now = Date.now();
          const elapsedOverall = now - card.lastTimeLearned;

          if (elapsedOverall > timeIntervals[card.timesLearned]) {
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

      setStore({ [type]: updatedLearnedItems });
    }
  };
});
