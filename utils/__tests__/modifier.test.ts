import { convertWordsDbToCards, mapCardDbToCard } from '@/utils/modifier';

describe('modifier utilities', () => {
  test('mapCardDbToCard converts a database card to UI card format', () => {
    const cardDb = {
      id: 36,
      text: 'yes',
      ipa: '/jɛs/',
      translation: 'да'
    };

    const card = mapCardDbToCard(cardDb);

    expect(card).toEqual({
      id: 36,
      content: [
        { type: 'title', text: 'yes', speak: true },
        { type: 'defaultSemiBold', text: 'да', hide: true },
        { type: 'defaultSecondary', text: '/jɛs/', hide: true }
      ]
    });
  });

  test('convertWordsDbToCards maps an array of database cards to UI cards', () => {
    const cardsDb = [
      { id: 1, text: 'hello', ipa: '/həˈloʊ/', translation: 'привет' },
      { id: 2, text: 'world', ipa: '/wɜːrld/', translation: 'мир' }
    ];

    const cards = convertWordsDbToCards(cardsDb);

    expect(cards).toHaveLength(2);
    expect(cards[0]).toEqual({
      id: 1,
      content: [
        { type: 'title', text: 'hello', speak: true },
        { type: 'defaultSemiBold', text: 'привет', hide: true },
        { type: 'defaultSecondary', text: '/həˈloʊ/', hide: true }
      ]
    });
    expect(cards[1]).toEqual({
      id: 2,
      content: [
        { type: 'title', text: 'world', speak: true },
        { type: 'defaultSemiBold', text: 'мир', hide: true },
        { type: 'defaultSecondary', text: '/wɜːrld/', hide: true }
      ]
    });
  });
});
