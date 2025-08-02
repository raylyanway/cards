import { StateCreator } from 'zustand';

import { timeIntervals } from '@/constants';
import { ILearnedCard, IWordDb } from '@/types';
import { mapWordDbToCard } from '@/utils/modifier';

import { IAllSlices, ICardSlice } from './types';

export const createCardSlice: StateCreator<IAllSlices, [], [], ICardSlice> = (
  set,
  get
) => {
  return {
    cards: [],
    // convert it to learnedWords
    learnedCards: {},

    setCards: () => getCardsToRepeatAndLearn(get().learnedCards, get().words),
    updateLearned: (cardId) => {
      const { learnedCards } = get();
      const learnedCard = learnedCards[cardId];

      if (!learnedCard) {
        learnedCards[cardId] = {
          id: cardId,
          timesLearned: 1,
          lastTimeLearned: Date.now()
        };

        set({ learnedCards });
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
          const learnedCard = learnedCards[cardId];

          learnedCards[cardId] = {
            ...learnedCard,
            timesLearned: learnedCard.timesLearned + 1,
            lastTimeLearned: Date.now()
          };

          set({ learnedCards });
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
  learnedCards: Record<string, ILearnedCard>,
  timeIntervals: number[]
): Record<string, ILearnedCard> {
  const now = Date.now();
  const updatedLearnedCards: Record<string, ILearnedCard> = {};

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

function getCardsToRepeatAndLearn(
  learnedCards: Record<string, ILearnedCard>,
  words: Record<string, IWordDb>
) {
  const now = Date.now();
  const cardIdsToRepeat: string[] = [];
  const learnedCardIds = Object.keys(learnedCards);

  // First check for cards that need repetition
  for (const id of learnedCardIds) {
    const card = learnedCards[id];
    // Skip fully learned cards
    if (card.timesLearned >= timeIntervals.length) continue;

    const elapsedTime = now - card.lastTimeLearned;
    const minTimeInterval = timeIntervals[card.timesLearned - 1];
    const maxTimeInterval = timeIntervals[card.timesLearned];

    if (elapsedTime > minTimeInterval && elapsedTime <= maxTimeInterval) {
      cardIdsToRepeat.push(id);
      if (cardIdsToRepeat.length === 10) break;
    }
  }

  const cardIdsToRepeatAndLearn = cardIdsToRepeat;

  if (cardIdsToRepeatAndLearn.length < 10) {
    const allWordCardIds = Object.keys(words);

    // If we don't have 10 cards, add new ones that haven't been learned
    for (const id of allWordCardIds) {
      if (!learnedCards[id]) cardIdsToRepeatAndLearn.push(id);
      if (cardIdsToRepeatAndLearn.length === 10) break;
    }
  }

  return cardIdsToRepeatAndLearn.map((id) => words[id]).map(mapWordDbToCard);
}
