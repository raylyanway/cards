import { StateCreator } from 'zustand';

import { timeIntervals, week } from '@/constants';
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

    setCards: () =>
      set({ cards: getCardsToRepeatAndLearn(get().learnedCards, get().words) }),
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
      set({ learnedCards: reduceLearnedCards(get().learnedCards) });
    }
  };
};

function isLearned(timesLearned: number) {
  return timesLearned >= timeIntervals.length;
}

function getElapsedTime(lastTimeLearned: number) {
  return Date.now() - lastTimeLearned;
}

function getReviewThreshold(timesLearned: number) {
  return timeIntervals[timesLearned - 1];
}

function isForgotten(learnedCard: ILearnedCard) {
  const { timesLearned, lastTimeLearned } = learnedCard;
  const forgettingThreshold = getReviewThreshold(timesLearned) + week;

  return getElapsedTime(lastTimeLearned) > forgettingThreshold;
}

function isReviewTime(learnedCard: ILearnedCard) {
  const { timesLearned, lastTimeLearned } = learnedCard;

  return getElapsedTime(lastTimeLearned) > getReviewThreshold(timesLearned);
}

function reduceLearnedCards(
  learnedCards: Record<string, ILearnedCard>
): Record<string, ILearnedCard> {
  const updatedLearnedCards: Record<string, ILearnedCard> = {};

  for (const [idStr, learnedCard] of Object.entries(learnedCards)) {
    const id = Number(idStr);
    const { timesLearned } = learnedCard;

    if (isLearned(timesLearned) || !isForgotten(learnedCard)) {
      updatedLearnedCards[id] = learnedCard;
      continue;
    }

    if (timesLearned > 1) {
      updatedLearnedCards[id] = {
        ...learnedCard,
        timesLearned: timesLearned - 1
      };
    }
  }

  return updatedLearnedCards;
}

function getCardsToRepeatAndLearn(
  learnedCards: Record<string, ILearnedCard>,
  words: Record<string, IWordDb>
) {
  const cardIdsToRepeat: string[] = [];
  const learnedCardIds = Object.keys(learnedCards);

  // First check for cards that need repetition
  for (const id of learnedCardIds) {
    const learnedCard = learnedCards[id];
    const { timesLearned } = learnedCard;

    if (isLearned(timesLearned)) continue;

    if (isReviewTime(learnedCard)) {
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
