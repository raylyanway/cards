import { ICard } from '@/types';

export const words: ICard[] = [
  {
    id: 1,
    category: ['A1'],
    meta: ['verb', 'бии', 'глагол', ''],
    content: [
      { type: 'title', text: 'bebebebebebebebebebebebebebe', speak: true },
      { type: 'defaultSecondary', text: '/biː/' },
      { type: 'defaultSemiBold', text: 'быть', hide: true }
    ]
  },
  {
    id: 2,
    category: ['A1'],
    meta: ['verb', 'хэв', 'глагол', ''],
    content: [
      { type: 'title', text: 'have', speak: true },
      { type: 'defaultSecondary', text: '/hæv/' },
      { type: 'defaultSemiBold', text: 'иметь', hide: true }
    ]
  }
];
