import { StateCreator } from 'zustand';

import { timeIntervals } from '@/constants';
import { ILearnedCard } from '@/types';
import { convertWordsDbToCards } from '@/utils/modifier';

import { words } from '../words';

import { IAllSlices, ICardSlice } from './types';

export const createCardSlice: StateCreator<IAllSlices, [], [], ICardSlice> = (
  set,
  get
) => {
  return {
    cardIndex: 0,
    cards: convertWordsDbToCards(words).slice(0, 10),
    learnedCards: {},

    setCardIndex: (index) => set({ cardIndex: index }),
    updateLearned: (cardId) => {
      const { learnedCards } = get();
      const card = learnedCards[cardId];

      if (!card) {
        const nextLearnedCards = { ...learnedCards };
        nextLearnedCards[cardId] = {
          id: cardId,
          timesLearned: 1,
          lastTimeLearned: Date.now()
        };

        set({
          learnedCards: nextLearnedCards
        });
      } else {
        const isLearned = card.timesLearned >= timeIntervals.length;

        if (isLearned) return;

        const now = Date.now();
        const elapsedOverall = now - card.lastTimeLearned;
        const maxTimeInterval = timeIntervals[card.timesLearned];
        const minTimeInterval = timeIntervals[card.timesLearned - 1];

        if (
          elapsedOverall > minTimeInterval &&
          elapsedOverall <= maxTimeInterval
        ) {
          const nextLearnedCards = { ...learnedCards };
          const card = nextLearnedCards[cardId];

          if (card) {
            nextLearnedCards[cardId] = {
              ...card,
              timesLearned: card.timesLearned + 1,
              lastTimeLearned: Date.now()
            };

            set({ learnedCards: nextLearnedCards });
          }
        }
      }
    },
    refreshLearned: () => {
      const { learnedCards } = get();
      const updatedLearnedItems = getUpdatedLearnedItems(
        learnedCards,
        timeIntervals
      );
      set({ learnedCards: updatedLearnedItems });
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
  learnedItems: Record<number, ILearnedCard>,
  timeIntervals: number[]
): Record<number, ILearnedCard> {
  const now = Date.now();
  const updatedItems: Record<number, ILearnedCard> = {};

  for (const [idStr, card] of Object.entries(learnedItems)) {
    const id = Number(idStr);
    const elapsedOverall = now - card.lastTimeLearned;
    const isBeforeMaxTime = elapsedOverall <= timeIntervals[card.timesLearned];
    const isLearned = card.timesLearned >= timeIntervals.length;

    if (isLearned || isBeforeMaxTime) {
      updatedItems[id] = card;
      continue;
    }

    // Calculate how many intervals back have passed since lastTimeLearned
    let newTimesLearned = card.timesLearned;
    let elapsed = elapsedOverall;

    while (newTimesLearned > 0 && elapsed > timeIntervals[newTimesLearned]) {
      elapsed -= timeIntervals[newTimesLearned];
      newTimesLearned--;
    }

    if (newTimesLearned === 0) {
      continue;
    }

    updatedItems[id] = {
      ...card,
      timesLearned: newTimesLearned
    };
  }

  return updatedItems;
}
