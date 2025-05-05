// https://icons.expo.fyi/Index

import Ionicons from '@expo/vector-icons/Ionicons';

import { fontSizes, palette } from '@/config';
import { useGlobalStore } from '@/store/useGlobalStore';
import {
  Color,
  FontSize,
  IoniconsProps,
  PaletteColor,
  ThemedColor
} from '@/types';

export interface IconProps extends Omit<IoniconsProps, 'size'> {
  color?: Color;
  size?: FontSize;
}

export const Icon = ({
  name,
  color = 'blue',
  size = 'sm',
  ...iconProps
}: IconProps) => {
  const themedColors = useGlobalStore((s) => s.computed.colors);
  const currentColor =
    themedColors[color as ThemedColor] || palette[color as PaletteColor];

  return (
    <Ionicons
      name={name}
      size={fontSizes[size]}
      color={currentColor}
      {...iconProps}
    />
  );
};
