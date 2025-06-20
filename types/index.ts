import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';

import { fontSizes, palette, themedColors } from '@/config';

export type IoniconsProps = ComponentProps<typeof Ionicons>;
export type Icon = IoniconsProps['name'];
export type Theme = keyof typeof themedColors;
export type ThemedColors = typeof themedColors.dark;
export type ThemedColor = keyof typeof themedColors.dark;
export type PaletteColor = keyof typeof palette;
export type Color = ThemedColor | PaletteColor;
export type FontSize = keyof typeof fontSizes;

export interface BlockListItem {
  secondaryText?: string;
  text: string;
  icon?: Icon;
}

export type LevelType = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface IContent {
  type: 'title' | 'subtitle' | 'defaultSecondary' | 'defaultSemiBold' | 'list';
  text?: string;
  list?: BlockListItem[];
  hide?: boolean;
  speak?: boolean;
}

export interface ICard {
  id?: number;
  level?: LevelType;
  meta?: string;
  subMeta?: string;
  metaSecondary?: string;
  subMetaSecondary?: string;
  content: IContent[];
}
