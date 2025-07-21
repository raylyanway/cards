import { useBoundStore } from '@/store/useBoundStore';
import { splitByParentheses } from '@/utils/parser';

import { Text, TextProps } from './Text';

export interface HighlightedTextProps extends TextProps {
  text?: string;
  containerProps?: TextProps;
}

export const HighlightedText = ({
  text = '',
  containerProps,
  ...textProps
}: HighlightedTextProps) => {
  const colors = useBoundStore((state) => state.getColors)();
  const color =
    textProps.type === 'defaultSecondary' ? colors.text : colors.textSecondary;

  return (
    <Text {...containerProps}>
      {splitByParentheses(text).map(({ highlight, id, text }) => (
        <Text key={id} style={highlight && { color }} {...textProps}>
          {text}
        </Text>
      ))}
    </Text>
  );
};
