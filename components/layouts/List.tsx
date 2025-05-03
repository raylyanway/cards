import React from 'react';
import { FlatList } from 'react-native';

import { Text } from '@/components/texts';


import { ListItem } from './ListItem';

interface ListProps {
  emptyListText?: string;
  list: any[];
  onPress?: (item: any) => void;
}

export const List = ({
  emptyListText = 'empty list',
  list,
  onPress
}: ListProps) => {
  const handlePress = (item: any) => {
    onPress?.(item);
  };

  if (!list.length) return <Text>{emptyListText}</Text>;

  return (
    <FlatList
      data={list}
      renderItem={() => <ListItem onPress={handlePress} />}
      keyExtractor={(item) => item.name}
    />
  );
};