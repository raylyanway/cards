import { useGlobalStore } from '@/store/useGlobalStore';
import { splitByParentheses } from '@/utils/parser';

import { Text, TextProps } from './Text';

interface HighlightedTextProps extends TextProps {
  children: string;
  highlightedTextProps?: TextProps;
}

export const HighlightedText = ({
  children,
  highlightedTextProps,
  ...textProps
}: HighlightedTextProps) => {
  const colors = useGlobalStore((s) => s.computed.colors);

  return (
    <Text {...textProps}>
      {splitByParentheses(children).map(({ highlight, id, text }) => (
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