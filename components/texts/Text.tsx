import { Text as RNText, TextProps as RNTextProps } from 'react-native';

import { fontSizes, fontWeights, lineHeights } from '@/config';
import { useGlobalStore } from '@/store/useGlobalStore';

const typeToStyle = {
  default: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm
  },
  defaultSecondary: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm
  },
  defaultSemiBold: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm
  },
  link: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm
  },
  subtitle: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.md
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.lg
  }
};

export type TextType = keyof typeof typeToStyle;

export interface TextProps extends RNTextProps {
  type?: TextType;
}

export const Text = ({ style, type = 'default', ...textProps }: TextProps) => {
  const colors = useGlobalStore((s) => s.computed.colors);

  const dynamicColor = {
    color:
      type === 'defaultSecondary'
        ? colors.textSecondary
        : type === 'link'
          ? colors.primary
          : colors.text
  };

  return (
    <RNText style={[typeToStyle[type], dynamicColor, style]} {...textProps} />
  );
};
