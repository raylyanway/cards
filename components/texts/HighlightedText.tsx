import { useGlobalStore } from '@/store/useGlobalStore';
import { splitByParentheses } from '@/utils/parser';

import { Text, TextProps } from './Text';

export interface HighlightedTextProps extends TextProps {
  text?: string;
  highlightedTextProps?: TextProps;
}

export const HighlightedText = ({
  text = '',
  highlightedTextProps,
  ...textProps
}: HighlightedTextProps) => {
  const colors = useGlobalStore((s) => s.computed.colors);

  return (
    <Text {...textProps}>
      {splitByParentheses(text).map(({ highlight, id, text }) => (
        <Text
          key={id}
          style={highlight && { color: colors.textSecondary }}
          {...highlightedTextProps}
        >
          {text}
        </Text>
      ))}
    </Text>
  );
};
