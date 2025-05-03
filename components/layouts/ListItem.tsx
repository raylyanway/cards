import React from 'react';

import { Button, ButtonProps } from '@/components/buttons';
import { Block, BlockProps } from '@/components/layouts';
import { Text, TextProps } from '@/components/texts';


interface ListItemProps extends ButtonProps {
  blockProps?: BlockProps
  textProps?: TextProps
}

export const ListItem = ({
  children,
  blockProps,
  textProps,
  ...buttonProps
}: ListItemProps) => {

  return (
    <Button {...buttonProps}>
      <Block {...blockProps}>
        <Text numberOfLines={1} {...textProps}>{children}</Text>
      </Block>
    </Button>
  );
};

