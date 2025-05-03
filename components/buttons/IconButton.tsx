import { Button, ButtonProps } from '@/components/buttons';
import { Icon, IconProps } from '@/components/icons';

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