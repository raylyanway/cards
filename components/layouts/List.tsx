import React from 'react';
import { FlatList } from 'react-native';

import { ListItemButton } from '@/components/buttons/ListItemButton';
import { Text } from '@/components/texts';

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
      renderItem={() => <ListItemButton onPress={handlePress} />}
      keyExtractor={(item) => item.name}
    />
  );
};
