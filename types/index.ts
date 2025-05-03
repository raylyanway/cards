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