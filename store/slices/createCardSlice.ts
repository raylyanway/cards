import { StateCreator } from 'zustand';

import { maxCards, maxCardsToReview, timeIntervals, week } from '@/constants';
import { ICardsInfo, ILearnedCard, IWordDb } from '@/types';
import { mapWordDbToCard } from '@/utils/modifier';

import { IAllSlices, ICardSlice } from './types';

export const createCardSlice: StateCreator<IAllSlices, [], [], ICardSlice> = (
  set,
  get
) => {
  return {
    cards: [],
    cardsInfo: {
      closestReviewTime: 0,
      cardsHoldCount: 0,
      cardsLearnCount: 0,
      cardsRepeatCount: 0,
      cardsCompletedCount: 0,
      cardsNotCompletedCount: 0
    },
    // convert it to learnedWords
    // learning cards
    learnedCards: {},

    setCardsInfo: () => {
      set({ cardsInfo: getCardsInfo(get().learnedCards, get().words) });
    },
    setCards: () => {
      set({
        cards: getCards(get().learnedCards, get().words)
      });
    },
    updateLearned: (cardId) => {
      const { learnedCards } = get();
      const nextLearnedCards = { ...learnedCards };
      const learnedCard = nextLearnedCards[cardId];

      if (!learnedCard) {
        nextLearnedCards[cardId] = {
          id: cardId,
          timesLearned: 1,
          lastTimeLearned: Date.now()
        };

        set({ learnedCards: nextLearnedCards });
      } else {
        if (isLearned(learnedCard)) return;

        if (isReviewTime(learnedCard)) {
          nextLearnedCards[cardId] = {
            ...learnedCard,
            timesLearned: learnedCard.timesLearned + 1,
            lastTimeLearned: Date.now()
          };

          set({ learnedCards: nextLearnedCards });
        }
      }

      get().setCardsInfo();
    },
    refreshLearned: () => {
      set({ learnedCards: reduceLearnedCards(get().learnedCards) });
      get().setCardsInfo();
    }
  };
};

function isLearned(learnedCard: ILearnedCard) {
  return learnedCard.timesLearned >= timeIntervals.length;
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

function getNextReviewTime(learnedCard: ILearnedCard) {
  const { timesLearned, lastTimeLearned } = learnedCard;

  return getReviewThreshold(timesLearned) - getElapsedTime(lastTimeLearned);
}

function reduceLearnedCards(
  learnedCards: Record<string, ILearnedCard>
): Record<string, ILearnedCard> {
  const updatedLearnedCards: Record<string, ILearnedCard> = {};

  for (const [idStr, learnedCard] of Object.entries(learnedCards)) {
    const id = Number(idStr);
    const { timesLearned } = learnedCard;

    if (isLearned(learnedCard) || !isForgotten(learnedCard)) {
      updatedLearnedCards[id] = learnedCard;
      continue;
    }

    if (timesLearned > 1) {
      updatedLearnedCards[id] = {
        ...learnedCard,
        timesLearned: timesLearned - 1,
        lastTimeLearned: Date.now()
      };
    }
  }

  return updatedLearnedCards;
}

function getCards(
  learnedCards: Record<string, ILearnedCard>,
  words: Record<string, IWordDb>
) {
  const cardIdsToRepeat: string[] = [];
  const learnedCardIds = Object.keys(learnedCards);

  // First check for cards that need repetition
  for (const id of learnedCardIds) {
    const learnedCard = learnedCards[id];

    if (isLearned(learnedCard)) continue;

    if (isReviewTime(learnedCard)) {
      cardIdsToRepeat.push(id);
      if (cardIdsToRepeat.length === maxCardsToReview) break;
    }
  }

  const cardIdsToRepeatAndLearn = cardIdsToRepeat;

  if (cardIdsToRepeatAndLearn.length < maxCards) {
    const allWordCardIds = Object.keys(words);

    // If we don't have 10 cards, add new ones that haven't been learned
    for (const id of allWordCardIds) {
      if (!learnedCards[id]) cardIdsToRepeatAndLearn.push(id);
      if (cardIdsToRepeatAndLearn.length === maxCards) break;
    }
  }

  return cardIdsToRepeatAndLearn.map((id) => words[id]).map(mapWordDbToCard);
}

function getCardsInfo(
  learnedCards: Record<string, ILearnedCard>,
  words: Record<string, IWordDb>
): ICardsInfo {
  const cardIdsToRepeat: string[] = [];
  const cardIdsOnHold: string[] = [];
  const completedCards: Record<string, ILearnedCard> = {};
  const nextReviewTimeList: number[] = [];
  const learnedCardIds = Object.keys(learnedCards);

  for (const id of learnedCardIds) {
    const learnedCard = learnedCards[id];

    if (isLearned(learnedCard)) {
      completedCards[id] = learnedCard;
      continue;
    }

    if (isReviewTime(learnedCard)) {
      cardIdsToRepeat.push(id);
      if (cardIdsToRepeat.length === maxCardsToReview) break;
      continue;
    }

    cardIdsOnHold.push(id);
    nextReviewTimeList.push(getNextReviewTime(learnedCard));
  }

  const cardIdsToLearn: string[] = [];
  const notCompletedCardIds: string[] = [];

  const allWordCardIds = Object.keys(words);

  for (const id of allWordCardIds) {
    if (!completedCards[id]) notCompletedCardIds.push(id);
    if (!learnedCards[id]) cardIdsToLearn.push(id);
  }

  const completedCardIds = Object.keys(completedCards);
  const closestReviewTime =
    nextReviewTimeList.length > 0
      ? Math.min(...nextReviewTimeList) + Date.now()
      : 0;

  return {
    closestReviewTime,
    cardsHoldCount: cardIdsOnHold.length,
    cardsLearnCount: cardIdsToLearn.length,
    cardsRepeatCount: cardIdsToRepeat.length,
    cardsCompletedCount: completedCardIds.length,
    cardsNotCompletedCount: notCompletedCardIds.length
  };
}
