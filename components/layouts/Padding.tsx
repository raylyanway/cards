import React from 'react';

import { View, ViewProps } from '@/components/layouts';
import { spaces } from '@/config';

export interface PaddingProps extends ViewProps {
  bottom?: number;
  left?: number;
  padding?: number;
  right?: number;
  top?: number;
}

export const Padding = ({
  bottom,
  children,
  left,
  padding = spaces.xl,
  right,
  style,
  top,
  ...viewProps
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
      {...viewProps}
    >
      {children}
    </View>
  );
};
