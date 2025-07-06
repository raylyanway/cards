import { ICard, IWordDb } from '@/types';

/**
 * Maps a word database object to a UI-friendly format.
 *
 * Example:
 * Input:
 * {
 *   id: 36,
 *   word: 'yes',
 *   translation: 'да, да, давай, конечно, давай, да',
 *   level: 'A1',
 *   partOfSpeech: 'adverb',
 *   partOfSpeechTranslation: 'наречие',
 *   ipa: '/jɛs/',
 *   ipaTranslation: 'eс',
 * }
 *
 * Output:
 * {
 *   id: 36,
 *   category: ['A1'],
 *   meta: ['adverb', 'ес', 'наречие', ''],
 *   content: [
 *     { type: 'title', text: 'yes', speak: true },
 *     { type: 'defaultSecondary', text: '/jɛs/' },
 *     { type: 'defaultSemiBold', text: 'да, да, давай, конечно, давай, да' }
 *   ]
 * }
 */
export function mapWordDbToCard(wordDb: IWordDb): ICard {
  return {
    id: wordDb.id,
    category: [wordDb.level],
    meta: [wordDb.partOfSpeech, '', wordDb.partOfSpeechTranslation, ''],
    content: [
      { type: 'title', text: wordDb.word, speak: true },
      {
        type: 'defaultSecondary',
        text: `${wordDb.ipa} - ${wordDb.ipaTranslation}`
      },
      { type: 'defaultSemiBold', text: wordDb.translation }
    ]
  };
}

/**
 * Converts words from DB to UI structure
 *
 * @param wordsDb
 * @returns
 */
export function convertWordsDbToCards(wordsDb: IWordDb[]): ICard[] {
  return wordsDb.map(mapWordDbToCard);
}
