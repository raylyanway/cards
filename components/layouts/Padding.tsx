import React, { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { spaces } from '@/config';

interface PaddingProps {
  bottom?: number;
  children: ReactNode;
  left?: number;
  padding?: number;
  right?: number;
  style?: StyleProp<ViewStyle>;
  top?: number;
}

export const Padding = ({
  bottom,
  children,
  left,
  padding = spaces.xl,
  right,
  style,
  top
}: PaddingProps) => {
  return (
    <View
      style={[
        {
          paddingBottom: bottom ?? padding,
          paddingLeft: left ?? padding,
          paddingRight: right ?? padding,
          paddingTop: top ?? padding
        },
        style
      ]}
    >
      {children}
    </View>
  );
};