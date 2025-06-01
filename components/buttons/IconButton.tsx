import { Icon, IconProps } from '@/components/icons/Icon';

import { Button, ButtonProps } from './Button';

interface IconButtonProps extends ButtonProps {
  name: IconProps['name'];
  iconProps?: Omit<IconProps, 'name'>;
}

export const IconButton = ({
  name,
  iconProps,
  ...buttonProps
}: IconButtonProps) => {
  return (
    <Button {...buttonProps}>
      <Icon name={name} {...iconProps} />
    </Button>
  );
};
