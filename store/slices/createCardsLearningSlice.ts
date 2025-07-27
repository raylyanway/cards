import { StateCreator } from 'zustand';

import { learnedTypeMap, timeIntervals } from '@/constants';
import { ILearnedCard, ILearnedCardType } from '@/types';
import { convertWordsDbToCards } from '@/utils/modifier';

import { cards } from '../cards';
import { words } from '../words';

import { IAllSlices, ICardsLearningSlice } from './types';

export const createCardsLearningSlice: StateCreator<
  IAllSlices,
  [],
  [],
  ICardsLearningSlice
> = (set, get) => {
  return {
    currentCardIndex: 0,
    currentCardsType: 'card',
    currentCards: cards,
    learnedCards: [],
    learnedWords: [],

    computedCardsLearning: {
      get currentLearnedCards() {
        const learnedType = learnedTypeMap[get().currentCardsType];

        return get()[learnedType];
      }
    },

    setCurrentCardsType: (cardType) => {
      const cardItems =
        cardType === 'word' ? convertWordsDbToCards(words).slice(0, 10) : cards;

      set({
        currentCards: cardItems,
        currentCardIndex: 0,
        currentCardsType: cardType
      });
    },
    setCurrentCardIndex: (index) => set({ currentCardIndex: index }),
    updateLearned: (cardId) => {
      const currentCardsType = get().currentCardsType;
      const learnedType = learnedTypeMap[currentCardsType];
      const learnedItems = get()[learnedType];
      const itemIndex = learnedItems.findIndex((card) => card.id === cardId);

      if (itemIndex === -1) {
        const newLearedCards: ILearnedCard[] = [
          ...learnedItems,
          { id: cardId, timesLearned: 1, lastTimeLearned: Date.now() }
        ];
        set({
          [learnedType]: newLearedCards
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
          set({ [learnedType]: updatedItems });
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
        set({ [learnedType]: updatedLearnedItems });
      });
    }
  };
};

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
