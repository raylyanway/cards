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
      const learnedCard = learnedCards[cardId];

      if (!learnedCard) {
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
        const isLearned = learnedCard.timesLearned >= timeIntervals.length;

        if (isLearned) return;

        const now = Date.now();
        const elapsedOverall = now - learnedCard.lastTimeLearned;
        const maxTimeInterval = timeIntervals[learnedCard.timesLearned];
        const minTimeInterval = timeIntervals[learnedCard.timesLearned - 1];

        if (
          elapsedOverall > minTimeInterval &&
          elapsedOverall <= maxTimeInterval
        ) {
          const nextLearnedCards = { ...learnedCards };
          const learnedCard = nextLearnedCards[cardId];

          nextLearnedCards[cardId] = {
            ...learnedCard,
            timesLearned: learnedCard.timesLearned + 1,
            lastTimeLearned: Date.now()
          };

          set({ learnedCards: nextLearnedCards });
        }
      }
    },
    refreshLearned: () => {
      const { learnedCards } = get();
      const updatedLearnedCards = getUpdatedLearnedCards(
        learnedCards,
        timeIntervals
      );
      set({ learnedCards: updatedLearnedCards });
    }
  };
};

/**
 * Updates the learned cards array by recalculating timesLearned based on elapsed time.
 * Cards that have exceeded all intervals are removed.
 *
 * @param learnedCards Array of learned cards (ILearnedCard[])
 * @param timeIntervals Array of time intervals (number[])
 * @returns Updated array of learned cards (ILearnedCard[])
 *
 * @example
 * Suppose timeIntervals = [1000, 2000, 3000]
 * Now = 10_000
 * getUpdatedLearnedCards([
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
function getUpdatedLearnedCards(
  learnedCards: Record<number, ILearnedCard>,
  timeIntervals: number[]
): Record<number, ILearnedCard> {
  const now = Date.now();
  const updatedLearnedCards: Record<number, ILearnedCard> = {};

  for (const [idStr, learnedCard] of Object.entries(learnedCards)) {
    const id = Number(idStr);
    const elapsedOverall = now - learnedCard.lastTimeLearned;
    const maxTimeInterval = timeIntervals[learnedCard.timesLearned];
    const isBeforeMaxTime = elapsedOverall <= maxTimeInterval;
    const isLearned = learnedCard.timesLearned >= timeIntervals.length;

    if (isLearned || isBeforeMaxTime) {
      updatedLearnedCards[id] = learnedCard;
      continue;
    }

    // Calculate how many intervals back have passed since lastTimeLearned
    let newTimesLearned = learnedCard.timesLearned;
    let elapsed = elapsedOverall;

    while (newTimesLearned > 0 && elapsed > timeIntervals[newTimesLearned]) {
      elapsed -= timeIntervals[newTimesLearned];
      newTimesLearned--;
    }

    if (newTimesLearned === 0) {
      continue;
    }

    updatedLearnedCards[id] = {
      ...learnedCard,
      timesLearned: newTimesLearned
    };
  }

  return updatedLearnedCards;
}
