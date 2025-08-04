import React from 'react';

import { HorizontalLine } from '@/components/HorizontalLine';

import { Block, BlockProps } from './Block';
import { View } from './View';

export interface ListProps<T> extends BlockProps {
  list: T[];
  renderItem: (item: T) => React.ReactNode;
}

export const List = <T extends { id: string }>({
  list,
  renderItem,
  ...blockProps
}: ListProps<T>) => {
  return (
    <Block {...blockProps}>
      {list.map((item, index) => {
        return (
          <View key={item.id}>
            {index !== 0 && <HorizontalLine />}
            {renderItem(item)}
          </View>
        );
      })}
    </Block>
  );
};
