
import { HorizontalLine } from '@/components/HorizontalLine';
import {
  HighlightedText,
  HighlightedTextProps,
  Text,
  TextProps
} from '@/components/texts';

import { Block, BlockProps } from './Block';
import { View, ViewProps } from './View';

export interface BlockListItem {
  secondaryText: string;
  text: string;
}

export interface BlockListProps extends BlockProps {
  list: BlockListItem[];
  viewProps?: ViewProps;
  textProps?: TextProps;
  highlightedTextProps?: HighlightedTextProps;
}

export const BlockList = ({
  viewProps,
  textProps,
  highlightedTextProps,
  list,
  ...blockProps
}: BlockListProps) => {
  return (
    <Block {...blockProps}>
      {list.map(({ text, secondaryText }, index) => (
        <View key={text} {...viewProps}>
          {index !== 0 && <HorizontalLine />}
          <HighlightedText {...highlightedTextProps}>{text}</HighlightedText>
          <Text type="defaultSecondary" {...textProps}>
            {secondaryText}
          </Text>
        </View>
      ))}
    </Block>
  );
};
