import React from 'react';
import { StyleSheet } from 'react-native';

import { radii, spaces } from '@/config/typography';
import { useBoundStore } from '@/store/useBoundStore';

import { Padding, PaddingProps } from './Padding';
import { View, ViewProps } from './View';

export interface BlockProps extends ViewProps {
  paddingProps?: PaddingProps;
  row?: boolean;
  fullWidth?: boolean;
  center?: boolean;
}

export const Block = ({
  children,
  style,
  row = false,
  fullWidth = false,
  center = false,
  paddingProps,
  ...viewProps
}: BlockProps) => {
  const colors = useBoundStore((state) => state.computedTheme.colors);
  const rowStyle = row ? styles.row : undefined;
  const fullWidthStyle = fullWidth ? styles.fullWidth : undefined;
  const centerStyle = center ? styles.center : undefined;

  return (
    <View
      style={[
        styles.default,
        fullWidthStyle,
        centerStyle,
        { backgroundColor: colors.backgroundBlock },
        style
      ]}
      {...viewProps}
    >
      <Padding padding={spaces.md} style={rowStyle} {...paddingProps}>
        {children}
      </Padding>
    </View>
  );
};

const styles = StyleSheet.create({
  default: {
    borderRadius: radii.md,
    alignSelf: 'flex-start'
  },
  fullWidth: {
    alignSelf: 'stretch'
  },
  center: {
    alignSelf: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spaces.md
  }
});
