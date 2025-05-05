import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { radii, spaces } from '@/config';
import { useGlobalStore } from '@/store/useGlobalStore';

import { Padding, PaddingProps } from './Padding';

export interface BlockProps extends ViewProps {
  paddingProps?: PaddingProps;
}

export const Block = ({
  children,
  style,
  paddingProps,
  ...viewProps
}: BlockProps) => {
  const colors = useGlobalStore((s) => s.computed.colors);

  return (
    <View
      style={[
        styles.default,
        { backgroundColor: colors.backgroundBlock },
        style
      ]}
      {...viewProps}
    >
      <Padding padding={spaces.md} {...paddingProps}>
        {children}
      </Padding>
    </View>
  );
};

const styles = StyleSheet.create({
  default: {
    borderRadius: radii.md
  }
});
