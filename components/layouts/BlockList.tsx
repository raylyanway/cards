import { Button } from '@/components/buttons/Button';
import { HorizontalLine } from '@/components/HorizontalLine';
import { Icon } from '@/components/icons/Icon';
import {
  HighlightedText,
  HighlightedTextProps
} from '@/components/texts/HighlightedText';
import { Text, TextProps } from '@/components/texts/Text';
import { Icon as IconType } from '@/types';

import { Block, BlockProps } from './Block';
import { View, ViewProps } from './View';

export interface BlockListItem {
  secondaryText?: string;
  text: string;
  icon?: IconType;
}

export interface BlockListProps extends BlockProps {
  list: BlockListItem[];
  containerProps?: ViewProps;
  textProps?: TextProps;
  secondaryTextProps?: HighlightedTextProps;
  onItemPress?: (item: BlockListItem) => void;
}

export const BlockList = ({
  containerProps,
  textProps,
  secondaryTextProps,
  list,
  onItemPress,
  ...blockProps
}: BlockListProps) => {
  return (
    <Block {...blockProps}>
      {list.map((item, index) => {
        const { text, secondaryText, icon } = item;
        const animated = icon === 'volume-medium';

        const handleItemPress = () => {
          onItemPress?.(item);
        };

        return (
          <View key={text} {...containerProps}>
            {index !== 0 && <HorizontalLine />}
            <Button animated={animated} onPress={handleItemPress}>
              <View row>
                {icon && <Icon name="volume-medium" />}
                <View>
                  <HighlightedText text={text} {...textProps} />
                  {secondaryText && (
                    <Text type="defaultSecondary" {...secondaryTextProps}>
                      {secondaryText}
                    </Text>
                  )}
                </View>
              </View>
            </Button>
          </View>
        );
      })}
    </Block>
  );
};
