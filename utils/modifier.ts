import { ICard, ICardDb } from '@/types';

/**
 * Maps a card database object to a UI-friendly format.
 *
 * Example:
 * Input:
 * {
 *   id: 36,
 *   text: 'yes',
 *   ipa: '/jɛs/',
 *   translation: 'да',
 * }
 *
 * Output:
 * {
 *   id: 36,
 *   content: [
 *     { type: 'title', text: 'yes', speak: true },
 *     { type: 'defaultSecondary', text: '/jɛs/' },
 *     { type: 'defaultSemiBold', text: 'да' }
 *   ]
 * }
 */
export function mapCardDbToCard(cardDb: ICardDb): ICard {
  return {
    id: cardDb.id,
    content: [
      { type: 'title', text: cardDb.text, speak: true },
      { type: 'defaultSemiBold', text: cardDb.translation, hide: true },
      {
        type: 'defaultSecondary',
        text: `${cardDb.ipa}`,
        hide: true
      }
    ]
  };
}

/* Converts words from DB to UI structure */
export function convertWordsDbToCards(cardsDb: ICardDb[]): ICard[] {
  return cardsDb.map((card) => mapCardDbToCard(card));
}
