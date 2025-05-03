import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { radii, spaces } from '@/config';
import { useGlobalStore } from '@/store/useGlobalStore';

import { Padding } from './Padding';

export interface BlockProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Block = ({ children, style, ...props }: BlockProps) => {
  const colors = useGlobalStore((s) => s.computed.colors);

  return (
    <View
      style={[
        styles.default,
        { backgroundColor: colors.backgroundBlock },
        style
      ]}
      {...props}
    >
      <Padding padding={spaces.md}>{children}</Padding>
    </View>
  );
};

const styles = StyleSheet.create({
  default: {
    borderRadius: radii.md
  }
});