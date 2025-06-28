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

export type ILevelType = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface IContent {
  type: 'title' | 'subtitle' | 'defaultSecondary' | 'defaultSemiBold' | 'list';
  text?: string;
  list?: IBlockListItem[];
  hide?: boolean;
  speak?: boolean;
}

export interface ICard {
  id: number;
  category: string[];
  meta: string[];
  content: IContent[];
}
