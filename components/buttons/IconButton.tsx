import { Icon, IconProps } from '@/components/icons/Icon';

import { AnimatedButtonProps, Button } from './Button';

interface IconButtonProps extends Omit<AnimatedButtonProps, 'animated'> {
  name: IconProps['name'];
  iconProps?: Omit<IconProps, 'name'>;
}

export const IconButton = ({
  name,
  iconProps,
  ...buttonProps
}: IconButtonProps) => {
  return (
    <Button animated {...buttonProps}>
      <Icon name={name} {...iconProps} />
    </Button>
  );
};
