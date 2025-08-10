import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';

import { fontSizes, palette, themedColors } from '@/config/typography';

export type IIoniconsProps = ComponentProps<typeof Ionicons>;
export type IIcon = IIoniconsProps['name'];
export type ITheme = keyof typeof themedColors;
export type IThemedColors = typeof themedColors.dark;
export type IThemedColor = keyof typeof themedColors.dark;
export type IPaletteColor = keyof typeof palette;
export type IColor = IThemedColor | IPaletteColor;
export type IFontSize = keyof typeof fontSizes;

export interface IBlockListItem {
  secondaryText?: string;
  text: string;
  icon?: IIcon;
}

export interface IContent {
  type: 'title' | 'subtitle' | 'defaultSecondary' | 'defaultSemiBold' | 'list';
  text?: string;
  list?: IBlockListItem[];
  hide?: boolean;
  speak?: boolean;
}

export interface ICard {
  id: number;
  content: IContent[];
}

export interface ILearnedCard {
  id: number;
  timesLearned: number;
  lastTimeLearned: number;
}

export interface IWordDb {
  id: number;
  word: string;
  translation: string;
  level: string;
  partOfSpeech: string;
  partOfSpeechTranslation: string;
  ipa: string;
  ipaTranslation: string;
  description?: string;
  descriptionTranslation?: string;
}

export interface ICardsInfo {
  cardIdsToLearn: string[];
  cardIdsToRepeat: string[];
}
