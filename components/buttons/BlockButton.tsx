import React from 'react';
import { StyleSheet } from 'react-native';

import { Block, BlockProps } from '@/components/layouts/Block';
import { Text, TextProps } from '@/components/texts/Text';

import { AnimatedButtonProps, Button } from './Button';

interface BlockButtonProps extends Omit<AnimatedButtonProps, 'animated'> {
  blockProps?: BlockProps;
  textProps?: TextProps;
  fullWidth?: boolean;
}

export const BlockButton = ({
  children,
  blockProps,
  textProps,
  fullWidth = false,
  style,
  ...buttonProps
}: BlockButtonProps) => {
  const blockStyle = fullWidth ? styles.fullWidth : undefined;

  return (
    <Button
      animated
      style={[styles.default, blockStyle, style]}
      {...buttonProps}
    >
      <Block {...blockProps}>
        <Text {...textProps}>{children}</Text>
      </Block>
    </Button>
  );
};

const styles = StyleSheet.create({
  default: {
    alignSelf: 'flex-start'
  },
  fullWidth: {
    alignSelf: 'stretch'
  }
});
