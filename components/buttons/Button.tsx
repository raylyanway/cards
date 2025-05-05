import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export type ButtonProps = TouchableOpacityProps;

export const Button = ({ children, ...props }: ButtonProps) => {
  return <TouchableOpacity {...props}>{children}</TouchableOpacity>;
};
