import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export type ButtonProps = TouchableOpacityProps;

export const Button = ({ children, ...buttonProps }: ButtonProps) => {
  return <TouchableOpacity {...buttonProps}>{children}</TouchableOpacity>;
};
