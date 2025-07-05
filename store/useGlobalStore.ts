import { ColorSchemeName } from 'react-native';
import { create } from 'zustand';

import { themedColors } from '@/config/typography';
import { learnedTypeMap, timeIntervals } from '@/constants';
import {
  ICard,
  ICardType,
  ILearnedCard,
  ILearnedCardType,
  ITheme,
  IThemedColors
} from '@/types';

import { cards } from './cards';
import { getStorage, setStorage } from './sqlStorage';
import { words } from './words';

interface State {
  computed: {
    colors: IThemedColors;
    isLightTheme: boolean;
    oppositeColors: IThemedColors;
  };
  setTheme: (theme: ITheme) => void;
  theme: ITheme;
  currentCardIndex: number;
  currentCardsType: ICardType;
  currentCards: ICard[];
  learnedCards: ILearnedCard[];
  learnedWords: ILearnedCard[];
  setCurrentCards: (type: ICardType) => void;
  setCurrentCardIndex: (index: number) => void;
  setCurrentCardsType: (cardType: ICardType) => void;
  hydrate: (colorScheme: ColorSchemeName) => Promise<void>;
  updateLearned: (cardId: number) => void;
  refreshLearned: () => void;
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
    currentCardIndex: 0,
    currentCardsType: 'card',
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
    setCurrentCardsType: (cardType: ICardType) =>
      set({ currentCardsType: cardType }),
    setCurrentCards: (type: ICardType) => {
      const cardItems = type === 'word' ? words : cards;
      set({ currentCards: cardItems, currentCardIndex: 0 });
    },
    setCurrentCardIndex: (index) => set({ currentCardIndex: index }),
    updateLearned: (cardId) => {
      get().refreshLearned();
      const currentCardsType = get().currentCardsType;
      const learnedType = learnedTypeMap[currentCardsType];
      const learnedItems = get()[learnedType];
      const itemIndex = learnedItems.findIndex((card) => card.id === cardId);

      if (itemIndex === -1) {
        setStore({
          [learnedType]: [
            ...learnedItems,
            { cardId, timesLearned: 1, lastTimeLearned: Date.now() }
          ]
        });
      } else {
        const item = learnedItems[itemIndex];
        const isLearned = item.timesLearned >= timeIntervals.length;

        if (isLearned) return;

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
          setStore({ [learnedType]: updatedItems });
        }
      }
    },
    refreshLearned: () => {
      const learnedTypes = Object.values(learnedTypeMap) as ILearnedCardType[];
      learnedTypes.forEach((learnedType) => {
        const learnedItems = get()[learnedType];
        const updatedLearnedItems = getUpdatedLearnedItems(
          learnedItems,
          timeIntervals
        );
        setStore({ [learnedType]: updatedLearnedItems });
      });
    }
  };
});

/**
 * Updates the learned cards array by recalculating timesLearned based on elapsed time.
 * Cards that have exceeded all intervals are removed.
 *
 * @param learnedItems Array of learned cards (ILearnedCard[])
 * @param timeIntervals Array of time intervals (number[])
 * @returns Updated array of learned cards (ILearnedCard[])
 *
 * @example
 * Suppose timeIntervals = [1000, 2000, 3000]
 * Now = 10_000
 * getUpdatedLearnedItems([
 *   { cardId: 1, timesLearned: 1, lastTimeLearned: 400 },
 *   { cardId: 2, timesLearned: 1, lastTimeLearned: 1000 },
 *   { cardId: 3, timesLearned: 1, lastTimeLearned: 2700 },
 *   { cardId: 4, timesLearned: 4, lastTimeLearned: 4000 },
 * ], timeIntervals)
 * Might return:
 * [
 *  { cardId: 2, timesLearned: 1, lastTimeLearned: 1000 },
 *  { cardId: 3, timesLearned: 1, lastTimeLearned: 2700 },
 *  { cardId: 4, timesLearned: 4, lastTimeLearned: 4000 },
 * ]
 * (cardId 1 is removed because all intervals have passed)
 */
function getUpdatedLearnedItems(
  learnedItems: ILearnedCard[],
  timeIntervals: number[]
): ILearnedCard[] {
  const now = Date.now();
  return learnedItems.reduce<ILearnedCard[]>((acc, card) => {
    const elapsedOverall = now - card.lastTimeLearned;
    const isBeforeMaxTime = elapsedOverall <= timeIntervals[card.timesLearned];
    const isLearned = card.timesLearned >= timeIntervals.length;

    if (isLearned || isBeforeMaxTime) {
      acc.push(card);
      return acc;
    }

    // Calculate how many intervals back have passed since lastTimeLearned
    let newTimesLearned = card.timesLearned;
    let elapsed = elapsedOverall;

    while (newTimesLearned > 0 && elapsed > timeIntervals[newTimesLearned]) {
      elapsed -= timeIntervals[newTimesLearned];
      newTimesLearned--;
    }

    if (newTimesLearned === 0) {
      return acc;
    }

    acc.push({
      ...card,
      timesLearned: newTimesLearned
    });

    return acc;
  }, []);
}
