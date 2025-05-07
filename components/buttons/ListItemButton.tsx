import React from 'react';

import { Block, BlockProps } from '@/components/layouts/Block';
import { Text, TextProps } from '@/components/texts/Text';

import { Button, ButtonProps } from './Button';

interface ListItemButtonProps extends ButtonProps {
  blockProps?: BlockProps;
  textProps?: TextProps;
}

export const ListItemButton = ({
  children,
  blockProps,
  textProps,
  ...buttonProps
}: ListItemButtonProps) => {
  return (
    <Button {...buttonProps}>
      <Block {...blockProps}>
        <Text numberOfLines={1} {...textProps}>
          {children}
        </Text>
      </Block>
    </Button>
  );
};
