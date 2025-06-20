import { ICard } from '@/types';

export const cards: ICard[] = [
  {
    id: 1,
    level: 'A1',
    meta: 'verb',
    subMeta: 'бии',
    metaSecondary: 'глагол',
    content: [
      { type: 'title', text: 'bebebebebebebebebebebebebebe', speak: true },
      { type: 'defaultSecondary', text: '/biː/' },
      { type: 'defaultSemiBold', text: 'быть', hide: true }
    ]
  },
  {
    id: 2,
    level: 'A1',
    meta: 'verb',
    subMeta: 'хэв',
    metaSecondary: 'глагол',
    content: [
      { type: 'title', text: 'have', speak: true },
      { type: 'defaultSecondary', text: '/hæv/' },
      { type: 'defaultSemiBold', text: 'иметь', hide: true }
    ]
  },
  {
    id: 3,
    level: 'A1',
    meta: 'quote',
    subMeta: 'self-affirmation',
    metaSecondary: 'цитата',
    subMetaSecondary: 'самоутверждение',
    content: [
      { type: 'subtitle', text: 'Just be yourself.', speak: true },
      { type: 'defaultSecondary', text: 'Просто будь собой.', hide: true }
    ]
  },
  {
    id: 4,
    level: 'A1',
    meta: 'quote',
    subMeta: 'philosophical',
    metaSecondary: 'цитата',
    subMetaSecondary: 'философская',
    content: [
      {
        type: 'subtitle',
        text: 'To be or not to be, that is the question.',
        speak: true
      },
      {
        type: 'defaultSecondary',
        text: 'Быть или не быть — вот в чём вопрос.',
        hide: true
      }
    ]
  },
  {
    id: 5,
    level: 'A1',
    meta: 'description',
    subMeta: 'face anatomy',
    metaSecondary: 'описание',
    subMetaSecondary: 'анатомия лица',
    content: [
      {
        type: 'subtitle',
        text: 'The human face has two eyes, a nose, and a mouth. Above the eyes are eyebrows, and below them are cheeks. Ears are on the sides of the head.',
        speak: true
      },
      {
        type: 'defaultSecondary',
        text: 'Человеческое лицо имеет два глаза, нос и рот. Над глазами находятся брови, а под ними щеки. Уши находятся по бокам головы.',
        hide: true
      }
    ]
  },
  {
    id: 6,
    level: 'A1',
    meta: 'irregular verbs',
    metaSecondary: 'неправильные глаголы',
    content: [
      {
        speak: true,
        hide: true,
        type: 'list',
        list: [
          {
            text: 'Just be yourself.',
            secondaryText: 'Просто будь собой.'
          },
          {
            text: 'Just be yourself.1',
            secondaryText: 'Просто будь собой.',
            icon: 'volume-medium'
          },
          {
            text: 'get1',
            secondaryText: 'получать',
            icon: 'volume-medium'
          },
          {
            text: 'get',
            secondaryText: 'получать',
            icon: 'volume-medium'
          }
        ]
      }
    ]
  },
  {
    id: 7,
    level: 'A1',
    meta: 'grammar',
    // subMeta: 'verb forms',
    // metaSecondary: 'грамматика',
    subMetaSecondary: 'формы глагола',
    content: [
      {
        type: 'subtitle',
        text: 'Add ~-ed~ to the base form of the verb',
        speak: true
      },
      {
        type: 'defaultSecondary',
        text: 'Добавьте ~-ed~ к базовой форме глагола',
        hide: true
      },
      {
        speak: true,
        hide: true,
        type: 'list',
        list: [
          {
            text: 'I worked hard yesterday.',
            secondaryText: 'Вчера я много работал.',
            icon: 'volume-medium'
          },
          {
            text: 'We played soccer in the park.',
            secondaryText: 'Мы играли в футбол в парке.',
            icon: 'volume-medium'
          }
        ]
      }
    ]
  }
];
