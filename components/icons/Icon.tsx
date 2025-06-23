// https://icons.expo.fyi/Index

import Ionicons from '@expo/vector-icons/Ionicons';

import { fontSizes, palette } from '@/config/typography';
import { useGlobalStore } from '@/store/useGlobalStore';
import {
  IColor,
  IFontSize,
  IIoniconsProps,
  IPaletteColor,
  IThemedColor
} from '@/types';

export interface IconProps extends Omit<IIoniconsProps, 'size'> {
  color?: IColor | string;
  size?: IFontSize;
}

export const Icon = ({
  name,
  color = 'text',
  size = 'sm',
  ...iconProps
}: IconProps) => {
  const themedColors = useGlobalStore((s) => s.computed.colors);
  const currentColor =
    themedColors[color as IThemedColor] ||
    palette[color as IPaletteColor] ||
    color ||
    themedColors.text;

  return (
    <Ionicons
      name={name}
      size={fontSizes[size]}
      color={currentColor}
      {...iconProps}
    />
  );
};
