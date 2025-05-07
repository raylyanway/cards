import React from 'react';
import { StyleSheet } from 'react-native';

import { radii, spaces } from '@/config';
import { useGlobalStore } from '@/store/useGlobalStore';

import { Padding, PaddingProps } from './Padding';
import { View, ViewProps } from './View';

export interface BlockProps extends ViewProps {
  paddingProps?: PaddingProps;
  row?: boolean;
}

export const Block = ({
  children,
  style,
  row = false,
  paddingProps,
  ...viewProps
}: BlockProps) => {
  const colors = useGlobalStore((s) => s.computed.colors);
  const rowStyle = row ? styles.row : undefined;

  return (
    <View
      style={[
        styles.default,
        { backgroundColor: colors.backgroundBlock },
        style
      ]}
      {...viewProps}
    >
      <Padding
        padding={spaces.md}
        style={rowStyle}
        {...paddingProps}
      >
        {children}
      </Padding>
    </View>
  );
};

const styles = StyleSheet.create({
  default: {
    borderRadius: radii.md
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spaces.md
  }
});
