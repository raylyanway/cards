import { Button } from '@/components/buttons/Button';
import { HorizontalLine } from '@/components/HorizontalLine';
import { Icon } from '@/components/icons/Icon';
import {
  HighlightedText,
  HighlightedTextProps
} from '@/components/texts/HighlightedText';
import { TextProps } from '@/components/texts/Text';
import { IBlockListItem } from '@/types';

import { Block, BlockProps } from './Block';
import { View, ViewProps } from './View';

export interface BlockListProps extends BlockProps {
  list: IBlockListItem[];
  containerProps?: ViewProps;
  textProps?: TextProps;
  secondaryTextProps?: HighlightedTextProps;
  onItemPress?: (item: IBlockListItem) => void;
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
        const animated = !!onItemPress;

        const handleItemPress = () => {
          onItemPress?.(item);
        };

        return (
          <View key={text} {...containerProps}>
            {index !== 0 && <HorizontalLine />}
            <Button animated={animated} onPress={handleItemPress}>
              <View row>
                {icon && <Icon name={icon} />}
                <View>
                  <HighlightedText text={text} {...textProps} />
                  {secondaryText && (
                    <HighlightedText
                      type="defaultSecondary"
                      text={secondaryText}
                      {...secondaryTextProps}
                    />
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
