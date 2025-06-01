import { HorizontalLine } from '@/components/HorizontalLine';
import {
  HighlightedText,
  HighlightedTextProps
} from '@/components/texts/HighlightedText';
import { Text, TextProps } from '@/components/texts/Text';

import { Block, BlockProps } from './Block';
import { View, ViewProps } from './View';

export interface BlockListItem {
  secondaryText?: string;
  text: string;
  startSlot?: React.ReactNode;
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
      {list.map(({ text, secondaryText, startSlot }, index) => (
        <View key={text} {...viewProps}>
          {index !== 0 && <HorizontalLine />}
          <View row style={{ justifyContent: undefined }}>
            {startSlot}
            <View>
              <HighlightedText text={text} {...highlightedTextProps} />
              {secondaryText && (
                <Text type="defaultSecondary" {...textProps}>
                  {secondaryText}
                </Text>
              )}
            </View>
          </View>
        </View>
      ))}
    </Block>
  );
};
