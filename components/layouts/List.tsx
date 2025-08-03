import React from 'react';

import { HorizontalLine } from '@/components/HorizontalLine';

import { Block, BlockProps } from './Block';

export interface ListProps<T> extends BlockProps {
  list: T[];
  renderItem: (item: T) => React.ReactNode;
}

export const List = <T,>({ list, renderItem, ...blockProps }: ListProps<T>) => {
  return (
    <Block {...blockProps}>
      {list.map((item, index) => {
        return (
          <>
            {index !== 0 && <HorizontalLine />}
            {renderItem(item)}
          </>
        );
      })}
    </Block>
  );
};
