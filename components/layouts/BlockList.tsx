import { View } from 'react-native';

import { HorizontalLine } from '@/components/HorizontalLine';
import { HighlightedText, Text } from '@/components/texts';

import { Block, BlockProps } from './Block';

export interface BlockListItem {
  secondaryText: string;
  text: string;
}

export interface BlockListProps {
  list: BlockListItem[];
  style?: BlockProps['style'];
}

export const BlockList = ({ list, style }: BlockListProps) => {
  return (
    <Block style={style}>
      {list.map(({ text, secondaryText }, index) => (
        <View key={text}>
          {index !== 0 && <HorizontalLine />}
          <HighlightedText>{text}</HighlightedText>
          <Text type="defaultSecondary">{secondaryText}</Text>
        </View>
      ))}
    </Block>
  );
};
