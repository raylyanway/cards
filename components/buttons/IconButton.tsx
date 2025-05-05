import { Icon, IconProps } from '@/components/icons';

import { Button, ButtonProps } from './Button';

interface IconButtonProps extends ButtonProps {
  iconProps: IconProps;
}

export const IconButton = ({ iconProps, ...buttonProps }: IconButtonProps) => {
  return (
    <Button {...buttonProps}>
      <Icon {...iconProps} />
    </Button>
  );
};
